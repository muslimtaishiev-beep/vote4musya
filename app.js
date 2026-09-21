/* ============================================================
   Муся — президент школы
   Движение: страница «дописывается». Ничего не появляется из
   пустоты, всё уже занимает своё место и только проявляется.
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. Проявление блоков по мере прокрутки ---------------
     Порог низкий, чтобы блок был уже виден, когда начинает
     проявляться: контент никогда не «ждёт» анимацию.        */
  var rise = document.querySelectorAll('.rise');

  if (reduced || !('IntersectionObserver' in window)) {
    rise.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    rise.forEach(function (el) { io.observe(el); });
  }

  /* ---- 2. Круг обводится один раз ---------------------------
     Длина пути измеряется у самого пути, а не подбирается на
     глаз: круг разный на разных ширинах экрана.             */
  var circles = document.querySelectorAll('.draw');

  circles.forEach(function (path) {
    var len;
    try { len = path.getTotalLength(); } catch (err) { len = 1400; }
    path.style.setProperty('--len', len);
  });

  if (reduced || !('IntersectionObserver' in window)) {
    circles.forEach(function (p) { p.classList.add('is-in'); });
  } else {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          co.unobserve(e.target);
        }
      });
    }, { threshold: 0.35 });

    circles.forEach(function (p) { co.observe(p); });
  }

  /* ---- 3. Форма идеи -----------------------------------------
     Заявки уходят в кабинет «Академии будущих лидеров».
     Поля НЕ вшиты в код: организатор меняет анкету в кабинете,
     страница подхватывает изменения сама.                     */

  var API  = 'https://www.studyfreeforum.com';
  var FORM = 'form_1789541783872';

  var form   = document.getElementById('ideaForm');
  var box    = document.getElementById('ideaFields');
  var msg    = document.getElementById('ideaMsg');
  var send   = document.getElementById('ideaSend');
  var lead   = document.getElementById('ideaLead');

  function say(text, kind) {
    if (!msg) return;
    msg.textContent = text;
    msg.className = 'form-msg' + (kind ? ' form-msg--' + kind : '');
  }

  /* строим поле по описанию с сервера */
  function buildField(f) {
    var wrap = document.createElement('div');
    wrap.className = 'field-row';

    var id = 'f_' + f.id;
    var label = document.createElement('label');
    label.className = 'hand field-label';
    label.setAttribute('for', id);
    label.textContent = f.label + (f.required ? ' *' : '');

    var el;
    // Однострочное поле, в котором просят «предложение», на деле
    // получает абзац: даём высоту по смыслу, не меняя тип поля.
    var wantsRoom = f.type === 'text' &&
      /предложени|иде|жалоб|коммент|расскаж|описан|пожелани/i.test(f.label || '');

    if (f.type === 'textarea' || wantsRoom) {
      el = document.createElement('textarea');
      el.rows = 4;
    } else if (f.type === 'select') {
      el = document.createElement('select');
      var empty = document.createElement('option');
      empty.value = '';
      empty.textContent = 'Выберите…';
      el.appendChild(empty);
      (f.options || []).forEach(function (o) {
        var opt = document.createElement('option');
        opt.value = o; opt.textContent = o;
        el.appendChild(opt);
      });
    } else if (f.type === 'checkbox') {
      el = document.createElement('input');
      el.type = 'checkbox';
      wrap.classList.add('field-row--check');
    } else {
      el = document.createElement('input');
      el.type = f.type === 'number' ? 'number'
              : f.type === 'date'   ? 'date'
              : f.type === 'file'   ? 'file'
              : 'text';
      if (f.type === 'file') el.accept = 'image/jpeg,image/png';
    }

    el.id = id;
    el.className = f.type === 'checkbox' ? 'field-check' : 'field';
    el.dataset.fieldId = f.id;
    el.dataset.fieldType = f.type;  // отправляем как объявил сервер
    if (f.required) el.required = true;
    if (f.placeholder) el.placeholder = f.placeholder;

    if (f.type === 'checkbox') {
      wrap.appendChild(el); wrap.appendChild(label);
    } else {
      wrap.appendChild(label); wrap.appendChild(el);
    }
    return wrap;
  }

  /* картинку ужимаем до отправки: предел 400 КБ на файл */
  function readImage(file) {
    return new Promise(function (resolve, reject) {
      if (!file) return resolve(null);
      if (!/^image\/(jpeg|png)$/.test(file.type)) {
        return reject(new Error('Можно приложить только фото JPG или PNG.'));
      }
      var fr = new FileReader();
      fr.onerror = function () { reject(new Error('Не удалось прочитать файл.')); };
      fr.onload = function () {
        var img = new Image();
        img.onerror = function () { reject(new Error('Это не похоже на картинку.')); };
        img.onload = function () {
          var max = 1200;
          var k = Math.min(1, max / Math.max(img.width, img.height));
          var c = document.createElement('canvas');
          c.width = Math.round(img.width * k);
          c.height = Math.round(img.height * k);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);

          var q = 0.82, out = c.toDataURL('image/jpeg', q);
          while (out.length > 400 * 1024 && q > 0.3) {
            q -= 0.12;
            out = c.toDataURL('image/jpeg', q);
          }
          if (out.length > 400 * 1024) {
            return reject(new Error('Фото слишком большое — выбери поменьше.'));
          }
          resolve(out);
        };
        img.src = String(fr.result);
      };
      fr.readAsDataURL(file);
    });
  }

  if (form && box && send) {
    /* --- шаг 1: спросить у сервера, какие поля рисовать --- */
    fetch(API + '/api/forms/public/' + FORM)
      .then(function (r) {
        return r.json().then(function (j) { return { status: r.status, body: j }; });
      })
      .then(function (res) {
        var j = res.body;

        if (res.status === 410 || (j && j.closed)) {
          box.innerHTML = '';
          send.remove();
          say(j.error || 'Приём предложений сейчас закрыт.', 'warn');
          return;
        }
        if (!j || !j.success || !j.form) {
          throw new Error((j && j.error) || 'Анкета недоступна.');
        }

        if (lead && j.form.description) lead.textContent = j.form.description;

        box.innerHTML = '';
        (j.form.fields || []).forEach(function (f) { box.appendChild(buildField(f)); });
        send.disabled = false;
      })
      .catch(function () {
        box.innerHTML = '';
        say('Не получилось загрузить анкету. Обнови страницу или напиши мне лично.', 'warn');
      });

    /* --- шаг 2: отправить --- */
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (send.disabled) return;

      var controls = box.querySelectorAll('[data-field-id]');
      var data = {};
      var missing = null;
      var files = [];

      controls.forEach(function (el) {
        var type = el.dataset.fieldType;
        var key  = el.dataset.fieldId;

        if (type === 'checkbox') {
          data[key] = el.checked;
          return;
        }
        if (type === 'file') {
          if (el.files && el.files[0]) files.push({ key: key, file: el.files[0] });
          else if (el.required && !missing) missing = el;
          return;
        }
        var v = el.value.trim();
        data[key] = v;
        if (el.required && !v && !missing) missing = el;
      });

      if (missing) {
        say('Заполни обязательное поле — без него не отправится.', 'warn');
        missing.focus();
        return;
      }

      // защита от двойного нажатия: сервер её не делает
      send.disabled = true;
      var restore = send.textContent;
      send.textContent = 'Отправляю…';
      say('');

      Promise.all(files.map(function (f) {
        return readImage(f.file).then(function (dataUrl) { data[f.key] = dataUrl; });
      }))
      .then(function () {
        return fetch(API + '/api/forms/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formId: FORM, data: data })
        });
      })
      .then(function (r) {
        return r.json().then(function (j) { return { status: r.status, body: j }; });
      })
      .then(function (res) {
        var j = res.body;

        if (!j || !j.success) {
          var text = (j && j.error) ? j.error
            : res.status === 413 ? 'Уменьши фотографию и попробуй ещё раз.'
            : res.status === 429 ? 'Слишком часто. Подожди минуту.'
            : res.status === 404 ? 'Анкета недоступна.'
            : 'Не отправилось. Попробуй ещё раз.';
          say(text, 'warn');
          send.disabled = false;
          send.textContent = restore;
          return;
        }

        // приняли — показываем код и ссылку на статус
        var code = j.qrToken;
        form.innerHTML =
          '<h3>Приняли</h3>' +
          '<p>' + (j.message || 'Заявка принята.') + ' Я разберу её лично.</p>' +
          (code
            ? '<p class="code-row">Твой код: <b class="code">' + code + '</b></p>' +
              '<p><a class="btn btn--ghost" href="' + API + '/track/' + code +
              '" target="_blank" rel="noopener">Посмотреть статус</a></p>'
            : '');
      })
      .catch(function (err) {
        say(err && err.message ? err.message : 'Нет связи с сервером. Попробуй позже.', 'warn');
        send.disabled = false;
        send.textContent = restore;
      });
    });
  }

  /* ---- 4. Поделиться ----------------------------------------- */
  var share = document.getElementById('shareBtn');
  var shareMsg = document.getElementById('shareMsg');

  if (share && shareMsg) {
    share.addEventListener('click', function () {
      var data = {
        title: 'Муся — президент школы',
        text: 'Не обещаю. Уже делаю.',
        url: location.href
      };

      if (navigator.share) {
        navigator.share(data).catch(function () { /* закрыли — молчим */ });
        return;
      }

      if (navigator.clipboard) {
        navigator.clipboard.writeText(location.href).then(function () {
          shareMsg.textContent = 'ссылка скопирована — кидай в чат';
        }, function () {
          shareMsg.textContent = 'не вышло скопировать, скопируй из адресной строки';
        });
      } else {
        shareMsg.textContent = 'скопируй ссылку из адресной строки';
      }
    });
  }
})();

/* ---- 5. Портреты, которых ещё нет ---------------------------
   Пока фото не подставлены, слот не должен выглядеть поломкой:
   показываем пиксель-спрайт и подпись, что сюда встанет фото. */
(function () {
  'use strict';
  var slots = document.querySelectorAll('.team__ph img');

  slots.forEach(function (img) {
    img.addEventListener('error', function () {
      var fig = img.closest('.team__ph');
      if (!fig || fig.classList.contains('is-empty')) return;
      fig.classList.add('is-empty');
      img.remove();
      fig.innerHTML =
        '<span class="team__empty">' +
          '<img src="img/sprite-musya.png" alt="" width="40" height="40">' +
          '<span class="hand">фото сюда</span>' +
        '</span>';
    });
  });

  var poster = document.querySelector('.poster img');
  if (poster) {
    poster.addEventListener('error', function () {
      var f = poster.closest('.poster');
      if (f) f.remove();
    });
  }
})();

/* ============================================================
   ЖИВЫЕ МОМЕНТЫ
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return;

  /* ---- 6. Имя ведёт за курсором ------------------------------
     Назначение: delight. Первый экран, видят один раз за визит.
     Значение идёт к цели с затуханием (пружина на rAF), а не
     прыгает за мышью: без инерции это читается механически. */
  var col  = document.querySelector('.hero__col');
  var name = document.querySelector('.hero__lean');

  if (col && name && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var target = 0, current = 0, running = false;

    var tick = function () {
      // критически задемпфированное приближение: без колебаний
      current += (target - current) * 0.09;
      name.style.setProperty('--lean', current.toFixed(3) + 'deg');

      if (Math.abs(target - current) > 0.004) {
        requestAnimationFrame(tick);
      } else {
        name.style.setProperty('--lean', target.toFixed(3) + 'deg');
        running = false;
      }
    };

    var start = function () {
      if (!running) { running = true; requestAnimationFrame(tick); }
    };

    col.addEventListener('pointermove', function (e) {
      var r = col.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      target = Math.max(-1, Math.min(1, dx)) * 1.5;   // максимум полтора градуса
      start();
    });

    col.addEventListener('pointerleave', function () { target = 0; start(); });
  }

  /* ---- 7. Кнопка «Голосую» ставит галочку --------------------
     Назначение: feedback. Действие редкое, поэтому здесь можно
     позволить себе момент. Галочка дочёркивается, потом
     страница уезжает к программе.                            */
  var voteBtns = document.querySelectorAll('a[href="#golos"].btn, a[href="#programma"].btn');

  voteBtns.forEach(function (btn) {
    if (btn.querySelector('.btn__check')) return;

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'btn__check');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M4 13 L9.5 18.5 L20 5.5');
    svg.appendChild(path);

    btn.addEventListener('click', function () {
      if (btn.classList.contains('is-marked')) return;
      var sprite = btn.querySelector('.btn__sprite');
      if (sprite) sprite.replaceWith(svg); else btn.prepend(svg);
      // класс на следующем кадре, иначе переход не запустится
      requestAnimationFrame(function () { btn.classList.add('is-marked'); });
    });
  });

  /* ---- 8. Красная линия полей отмечает прочитанное -----------
     Назначение: state indication. У списка из пятнадцати
     пунктов не видно дна; линия на полях показывает, сколько
     пройдено, и делает длину списка осязаемой.               */
  var prog = document.createElement('div');
  prog.className = 'readline';
  prog.setAttribute('aria-hidden', 'true');
  document.body.appendChild(prog);

  var list = document.getElementById('programma');
  var raf = null;

  var draw = function () {
    raf = null;
    if (!list) return;
    var r = list.getBoundingClientRect();
    var vh = window.innerHeight;

    // Прогресс считаем по тому, сколько списка ПРОЙДЕНО за линией
    // взгляда — она на трети экрана сверху. До списка — 0, после — 1.
    var eye = vh * 0.34;
    var passed = eye - r.top;               // сколько списка уже выше взгляда
    var total  = r.height - eye;            // сколько всего предстоит пройти

    var p = total > 0 ? passed / total : 0;
    p = Math.max(0, Math.min(1, p));
    prog.style.transform = 'scaleY(' + p.toFixed(4) + ')';
  };

  var onScroll = function () { if (!raf) raf = requestAnimationFrame(draw); };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  draw();
})();

/* ============================================================
   СТАТУС ПРЕДЛОЖЕНИЯ ПО КОДУ
   API отдаёт только свою заявку по её коду — чужие тексты
   недоступны, и это правильно: анкета анонимная.
   ============================================================ */
(function () {
  'use strict';

  var API = 'https://www.studyfreeforum.com';

  var form   = document.getElementById('trackForm');
  var input  = document.getElementById('trackCode');
  var btn    = document.getElementById('trackBtn');
  var msg    = document.getElementById('trackMsg');
  var out    = document.getElementById('trackResult');
  if (!form || !input || !btn || !msg || !out) return;

  /* дата приходит как {_seconds}; показываем по-человечески */
  function when(t) {
    if (!t) return '';
    var ms = typeof t === 'object' && t._seconds ? t._seconds * 1000 : Date.parse(t);
    if (!ms || isNaN(ms)) return '';
    try {
      return new Date(ms).toLocaleDateString('ru-RU', {
        day: 'numeric', month: 'long'
      });
    } catch (e) { return ''; }
  }

  /* статусы кабинета -> форма метки на странице.
     Форма важнее цвета: так же, как у пунктов программы. */
  function shape(status) {
    if (/approved|accepted|done|complete|resolved/i.test(status)) return 'now';
    if (/progress|review|work|pending/i.test(status))             return 'try';
    if (/reject|declин|declined|closed/i.test(status))            return 'plan';
    return 'try';
  }

  function esc(t) {
    return String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function say(text, kind) {
    msg.textContent = text;
    msg.className = 'form-msg' + (kind ? ' form-msg--' + kind : '');
  }

  function render(sub) {
    var kind = shape(sub.status || '');
    var mark = kind === 'now'
      ? '<circle cx="12" cy="12" r="7" fill="currentColor"/>'
      : kind === 'try'
        ? '<circle cx="12" cy="12" r="6.6" stroke="currentColor" stroke-width="2.6" stroke-dasharray="3 3"/>'
        : '<circle cx="12" cy="12" r="6.6" stroke="currentColor" stroke-width="2.6"/>';

    var html =
      '<div class="track__card">' +
        '<p class="track__code pix">' + esc(sub.code) + '</p>' +
        '<span class="status status--' + kind + '">' +
          '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' + mark + '</svg>' +
          esc(sub.statusLabel || 'В работе') +
        '</span>';

    if (sub.createdAt) {
      var d = when(sub.createdAt);
      if (d) html += '<p class="track__date">подано ' + esc(d) + '</p>';
    }

    /* Ответ партии берём из последней заметки в истории.
       Отдельного публичного поля у API пока нет, поэтому всё,
       что написано в заметке, увидит заявитель — служебные
       пометки в кабинете туда писать нельзя. */
    var history = Array.isArray(sub.history) ? sub.history : [];
    var reply = null;
    for (var i = history.length - 1; i >= 0; i--) {
      var n = history[i] && history[i].note;
      if (n && String(n).trim()) { reply = history[i]; break; }
    }

    if (reply) {
      html +=
        '<figure class="reply">' +
          '<blockquote class="reply__text">' + esc(String(reply.note).trim()) + '</blockquote>' +
          '<figcaption class="reply__from">' +
            '<img src="img/sprite-musya.png" alt="" width="20" height="20">' +
            'ответ партии <b>67</b>' +
            (when(reply.at) ? ' · ' + esc(when(reply.at)) : '') +
          '</figcaption>' +
        '</figure>';
    }

    /* путь заявки: шаги, а не просто список */
    if (history.length) {
      html += '<ol class="steps">';
      history.forEach(function (h, idx) {
        var last = idx === history.length - 1;
        html +=
          '<li class="steps__i' + (last ? ' steps__i--last' : '') + '">' +
            '<span class="steps__dot" aria-hidden="true"></span>' +
            '<span class="steps__label">' + esc(h.label || h.status || '') + '</span>' +
            (when(h.at) ? '<span class="steps__date">' + esc(when(h.at)) + '</span>' : '') +
          '</li>';
      });
      html += '</ol>';
    }

    html +=
      '<p class="track__more">' +
        '<a href="' + API + '/track/' + encodeURIComponent(sub.code) + '" ' +
           'target="_blank" rel="noopener">Открыть в кабинете</a>' +
      '</p>' +
      '</div>';

    out.innerHTML = html;
    out.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var code = input.value.trim().toUpperCase().replace(/\s+/g, '');
    if (!code) {
      say('Введи код — он выдаётся после отправки предложения.', 'warn');
      input.focus();
      return;
    }

    out.hidden = true;
    out.innerHTML = '';
    btn.disabled = true;
    var restore = btn.textContent;
    btn.textContent = 'Ищу…';
    say('');

    fetch(API + '/api/forms/track/' + encodeURIComponent(code))
      .then(function (r) {
        return r.json().then(function (j) { return { status: r.status, body: j }; });
      })
      .then(function (res) {
        var j = res.body;
        if (!j || !j.success || !j.submission) {
          say(res.status === 404
                ? 'Такого кода нет. Проверь, не потерялся ли символ.'
                : (j && j.error) || 'Не получилось найти заявку.', 'warn');
          return;
        }
        render(j.submission);
      })
      .catch(function () {
        say('Нет связи с сервером. Попробуй позже.', 'warn');
      })
      .then(function () {
        btn.disabled = false;
        btn.textContent = restore;
      });
  });
})();

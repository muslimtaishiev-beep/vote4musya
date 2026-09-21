#!/bin/sh
# ============================================================
#  Обрезка портретов партии 67 под сетку сайта.
#
#  КАК ПОЛЬЗОВАТЬСЯ:
#  1. Положи исходные фото в папку img/team/raw/
#     Имена не важны — скрипт возьмёт их по алфавиту.
#     Своё фото (кудрявый, синяя футболка, язык) назови musya.jpg,
#     чтобы оно точно встало первым.
#  2. Запусти:  sh crop-team.sh
#  3. Готово — фото окажутся в img/team/ уже обрезанные.
#
#  Что делает: режет в пропорцию 3:4 по центру верхней части кадра
#  (там, где лицо на портретах в полный рост), сжимает до 840×1120
#  и давит вес до ~200 КБ, чтобы страница открывалась на школьном вайфае.
# ============================================================

set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
RAW="$DIR/img/team/raw"
OUT="$DIR/img/team"

if [ ! -d "$RAW" ]; then
  echo "Нет папки $RAW"
  echo "Создай её и положи туда фото:  mkdir -p img/team/raw"
  exit 1
fi

W=840; H=1120

crop_one() {
  src="$1"; dst="$2"
  # 1) вписываем в 3:4, обрезая лишнее по центру
  # 2) поднимаем рамку выше середины, чтобы лицо не обрезалось сверху
  sips -s format jpeg "$src" --out "$dst.tmp.jpg" >/dev/null 2>&1

  # реальные размеры
  sw=$(sips -g pixelWidth  "$dst.tmp.jpg" | awk '/pixelWidth/{print $2}')
  sh=$(sips -g pixelHeight "$dst.tmp.jpg" | awk '/pixelHeight/{print $2}')

  # нужная высота при текущей ширине для пропорции 3:4
  want_h=$(awk -v w="$sw" 'BEGIN{printf "%d", w*4/3}')

  if [ "$want_h" -le "$sh" ]; then
    # фото выше, чем надо: режем по высоте, смещая кадр к верхней трети
    off=$(awk -v s="$sh" -v w="$want_h" 'BEGIN{o=(s-w)*0.28; if(o<0)o=0; printf "%d", o}')
    sips -c "$want_h" "$sw" --cropOffset "$off" 0 "$dst.tmp.jpg" --out "$dst.tmp2.jpg" >/dev/null
  else
    # фото шире, чем надо: режем по ширине по центру
    want_w=$(awk -v h="$sh" 'BEGIN{printf "%d", h*3/4}')
    sips -c "$sh" "$want_w" "$dst.tmp.jpg" --out "$dst.tmp2.jpg" >/dev/null
  fi

  sips -z "$H" "$W" "$dst.tmp2.jpg" --out "$dst" >/dev/null
  sips -s formatOptions 72 "$dst" --out "$dst" >/dev/null
  rm -f "$dst.tmp.jpg" "$dst.tmp2.jpg"
  echo "  → $(basename "$dst")  $(du -h "$dst" | cut -f1)"
}

echo "Обрезаю портреты…"

# Муся всегда первый
if [ -f "$RAW/musya.jpg" ] || [ -f "$RAW/musya.jpeg" ]; then
  MUSYA=$(ls "$RAW"/musya.* 2>/dev/null | head -1)
  crop_one "$MUSYA" "$OUT/musya.jpg"
  rest=$(ls "$RAW" | grep -iv '^musya\.' | grep -iE '\.(jpg|jpeg|png|heic)$' || true)
else
  rest=$(ls "$RAW" | grep -iE '\.(jpg|jpeg|png|heic)$' || true)
fi

i=2
# читаем построчно: в именах из WhatsApp есть пробелы
printf '%s\n' "$rest" | while IFS= read -r f; do
  [ -z "$f" ] && continue
  [ "$i" -gt 6 ] && break
  crop_one "$RAW/$f" "$OUT/member-$i.jpg"
  i=$((i+1))
done

# постер отдельно — он широкий, его не режем в портрет
if [ -f "$RAW/poster.jpg" ]; then
  sips -Z 1600 "$RAW/poster.jpg" --out "$OUT/poster.jpg" >/dev/null
  sips -s formatOptions 72 "$OUT/poster.jpg" --out "$OUT/poster.jpg" >/dev/null
  echo "  → poster.jpg  $(du -h "$OUT/poster.jpg" | cut -f1)"
fi

echo "Готово. Обнови страницу в браузере."

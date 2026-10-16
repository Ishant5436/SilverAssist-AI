import os
import struct
import zlib
import math

def write_png(filename, width, height, pixels):
    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0) # filter byte 0 (None)
        for x in range(width):
            r, g, b, a = pixels[y][x]
            raw_data.extend([r, g, b, a])

    compressed = zlib.compress(bytes(raw_data), 9)
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    png = b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', compressed) + chunk(b'IEND', b'')

    with open(filename, 'wb') as f:
        f.write(png)

def generate_icon(size, out_path):
    pixels = []
    center = size / 2.0
    radius = size * 0.45
    corner_r = size * 0.22

    for y in range(size):
        row = []
        for x in range(size):
            # Rounded rect background
            dx = max(abs(x - center) - (center - corner_r), 0)
            dy = max(abs(y - center) - (center - corner_r), 0)
            dist_corner = math.sqrt(dx * dx + dy * dy)

            if dist_corner > corner_r:
                # Outside rounded rect
                row.append((0, 0, 0, 0))
                continue

            # Gradient background from deep royal blue to bright azure
            grad = y / float(size)
            r = int(30 + grad * 15)
            g = int(60 + grad * 70)
            b = int(210 + grad * 35)
            a = 255

            # Outer border highlight
            border_dist = min(x, y, size - 1 - x, size - 1 - y)
            if border_dist < max(1, size // 24):
                r, g, b = 147, 197, 253 # soft gold/light blue border

            # Center symbol: Star / Heart / Glasses motif
            # Draw golden star / sparkle in center
            rel_x = (x - center) / (size * 0.3)
            rel_y = (y - center) / (size * 0.3)

            # Astroid shape: |x|^0.5 + |y|^0.5 <= 1
            astroid = math.sqrt(abs(rel_x)) + math.sqrt(abs(rel_y)) if abs(rel_x) <= 1 and abs(rel_y) <= 1 else 99
            
            # Or circle eye/glasses:
            eye_left_dist = math.hypot(x - (center - size*0.14), y - center)
            eye_right_dist = math.hypot(x - (center + size*0.14), y - center)
            eye_r = size * 0.13

            # Draw glasses frame / friendly emblem
            is_glasses = (abs(eye_left_dist - eye_r) < max(1.2, size * 0.045)) or \
                         (abs(eye_right_dist - eye_r) < max(1.2, size * 0.045)) or \
                         (abs(y - center) < max(1, size * 0.035) and abs(x - center) < size * 0.14)

            # Sparkle in top-right
            sp_x = (x - (center + size*0.25)) / (size * 0.12)
            sp_y = (y - (center - size*0.25)) / (size * 0.12)
            is_sparkle = (abs(sp_x) <= 1 and abs(sp_y) <= 1 and (math.sqrt(abs(sp_x)) + math.sqrt(abs(sp_y)) <= 1.05))

            if is_glasses or is_sparkle:
                # Bright warm gold #FACC15
                r, g, b = 250, 204, 21
            elif (eye_left_dist < eye_r) or (eye_right_dist < eye_r):
                # Inner lens soft glowing cyan
                r, g, b = 224, 242, 254

            row.append((r, g, b, a))
        pixels.append(row)

    write_png(out_path, size, size, pixels)
    print(f"Generated {out_path} ({size}x{size})")

os.makedirs('extension/icons', exist_ok=True)
for sz in [16, 32, 48, 128]:
    generate_icon(sz, f'extension/icons/icon{sz}.png')
print("All icons successfully generated.")

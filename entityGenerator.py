import json


x = 0
y = 0
tileWidth = 32
tileHeight = 32
mapwidth = 10


result = []

for tile_num in [35, 35, 35, 35, 35, 23, 35, 35, 35, 35, 35, 35, 35, 35, 23, 23, 35, 35, 35, 35, 35, 23, 23, 35, 35, 23, 35, 23, 35, 35, 35, 23, 23, 23, 35, 23, 35, 23, 23, 35, 35, 23, 23, 23, 35, 23, 35, 23, 35, 35, 35, 35, 23, 35, 23, 23, 35, 23, 35, 35, 35, 35, 35, 35, 23, 35, 35, 23, 35, 35, 35, 23, 23, 35, 23, 35, 35, 35, 35, 35, 35, 23, 23, 35, 23, 35, 35, 35, 35, 35, 35, 35, 35, 35, 23, 23, 23, 35, 35, 23]:
    if x / mapwidth == 1:
        y += 1
        x = 0
    ent = {}
    ent['sprite'] = "tile" + str(tile_num)
    ent['position_x'] = x * tileWidth
    ent['position_y'] = y * tileHeight

    result.append(ent)

    x += 1

print json.dumps(result)


def autotag(tags, title, body):
    maxNum = 0
    tag = ''

    for t in tags:
        count = title.lower().count(t.lower()) + body.lower().count(t.lower())
        if count > maxNum:
            maxNum = count
            tag = t
    
    if maxNum != 0:
        return tag
    return None
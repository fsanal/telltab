import re
import nltk

from nltk.corpus import stopwords

def similarity(doc1, doc2):
    stops = set(stopwords.words('english'))
    d1 = set(re.sub("[^\w]", " ", doc1.lower()).split()) - stops
    scores = []

    for doc in doc2:
        d2 = set(re.sub("[^\w]", " ", doc.lower()).split()) - stops
        scores.append(len(d1.intersection(d2)) / len(d1.union(d2)))

    return scores
import re
import nltk

from nltk.corpus import stopwords

def similarity(doc1, doc2):
    stops = set(stopwords.words('english'))
    l1 = set(re.sub("[^\w]", " ", doc1.lower()).split()) - stops
    l2 = set(re.sub("[^\w]", " ", doc2.lower()).split()) - stops
    
    return len(l1.intersection(l2)) / len(l1.union(l2))
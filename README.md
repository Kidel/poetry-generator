poetry-generator
================

A JavaScript translated version of the Python3 based Backus-Naur poetry generator by [schollz](https://github.com/schollz/poetry-generator).

This program works on the basis that every word in the English language is either "positive" or "negative." For instance "lovely" is positive and "thorn" is negative. A "poem" is a group of sentences that are structured in a way to have +1, -1 or 0 in terms of the positivity/negativity.  A "mushy poem" is strictly positive.

All the syntax and word choices are in the ```dictionary.js``` file. The main program is in ```poem.js``` and for web applications use the ```index.html``` to automatically generate some different poems and titles!

[demo here](http://poetrygen.azurewebsites.net)
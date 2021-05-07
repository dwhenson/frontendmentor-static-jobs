# Frontend Mentor - Job listings with filtering solution page

![Design preview for the Job listings with filtering solution page coding challenge](./design/desktop-preview.jpg)

## The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Filter job listings based on the categories

## Lessons learnt

- 💡 Comment my Javascript as I go along! It was good to have to go through this one again after a week or so's break as it made me realise the importance of good comments!

- 💡 Two arrays with one level deep can be comparted using the following helper function which returns a boolean:

```
const checker = (array, target) => target.every((value) => array.includes(value));
```

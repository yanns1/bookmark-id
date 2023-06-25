# Bookmark id

## The problem

My browser workflow usually looks like this:

1. Start from blank page and open a few tabs OR open all bookmarks from a bookmark folder.
2. Do stuff, add some tabs, close others.
3. Ctrl+Shift+d to save all open tabs in a new bookmark folder.

However, I usually place the new bookmark folder within an existing bookmark folder, so I need to choose that folder as Location in the dialog that opens on Ctrl+Shift+d.
The thing is that I often end up putting new bookmark folders in the same existing bookmark folder, but I can't set it as the default Location.
I searched for ways to do that within Firefox, but didn't found better than the strategy laid out [here](https://support.mozilla.org/en-US/questions/1326554), using an autoconfig file.

## The solution

I thus created an autoconfig file following [these instructions](https://support.mozilla.org/en-US/kb/customizing-firefox-using-autoconfig).
The content of `autoconfig.js` is:

```
pref("general.config.filename", "firefox.cfg");
pref("general.config.obscure_value", 0);
```

and the content of `firefox.cfg`:

```
// IMPORTANT: Start your code on the 2nd line
lockPref("browser.bookmarks.defaultLocation", "<bookmark-id>");
```

with `<bookmark-id>` being the id of a bookmark folder.

(Note: You may need admin rights to write these files.)

In my understanding, there is no way to access a bookmark's id without a bit of code, and an extension can't have the right to change that browser setting (not in the WebExtension API, and probably a Firefox specific setting).
So I made this extension to ease the process of changing the default location a little bit, but one still needs to manually copy the bookmark id and replace `<bookmark-id>` with it.

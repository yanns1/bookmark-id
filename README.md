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

### On Windows

Create an autoconfig file following [these instructions](https://support.mozilla.org/en-US/kb/customizing-firefox-using-autoconfig).
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

This was tested on Windows 10.

### On Linux

Before continuing, everything was tested on Linux Mint 21.2 x86_64, with firefox-esr version 115.6.0.

Note also that there is few documentation out there, and if there is, it might be outdated.
Most of my "documentation" was blog posts or forum comments, so everything following is to be taken with a grain of salt.
Only one thing is for sure, what follows worked for me, on my system.

First of all, it doesn't seem possible to use autoconfig in regular Firefox.
It is however possible in Firefox ESR (Extended Support Release), which is a more stable version of Firefox, with long support, and generally targeted for enterprise use.
It is available in Mozilla's PPA called `mozillateam/ppa` (see [here](https://launchpad.net/~mozillateam/+archive/ubuntu/ppa)).
In short, the commands to run are:

```
sudo apt update && sudo apt upgrade
sudo add-apt-repository ppa:mozillateam/ppa
sudo apt update
sudo apt install firefox-esr
```

Once the installation is done, you will find a kind of configuration file at `/etc/firefox-esr/syspref.js`.
This file seems to be an equivalent of `autoconfig.js` for system-wide application (meaning to all the users of the machine).
Now one just has to write the following in `/etc/firefox-esr/syspref.js`:

```
// IMPORTANT: Start your code on the 2nd line
lockPref("browser.bookmarks.defaultLocation", "<bookmark-id>");
```

with `<bookmark-id>` being the id of a bookmark folder (need administrative privileges).

Another way is to write the following in `/usr/lib/firefox-esr/defaults/pref/autoconfig.js`:

```
pref("general.config.filename", "firefox.cfg");
pref("general.config.obscure_value", 0);
```

then the following in `/usr/lib/firefox-esr/firefox.cfg`:

```
// IMPORTANT: Start your code on the 2nd line
lockPref("browser.bookmarks.defaultLocation", "<bookmark-id>");
```

but I didn't do that because the contents of `/usr/lib/firefox-esr/` can be overwritten on updates.

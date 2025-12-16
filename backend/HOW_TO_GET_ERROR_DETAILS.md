# How to Get Full Error Details from IntelliJ

When you see `java.lang.ExceptionInInitializerError` in IntelliJ, you need to get the **full stack trace** to diagnose the issue.

## Method 1: Check the Run Console

1. **Look at the Run tab** at the bottom of IntelliJ
2. **Scroll up** to find the full error message
3. The error will show:
   - `Caused by:` lines (most important!)
   - Full stack trace
   - The actual root cause

## Method 2: Check IntelliJ Logs

1. Go to **Help → Show Log in Files**
2. Open `idea.log`
3. Search for `ExceptionInInitializerError`
4. Copy the full stack trace (20-30 lines around the error)

## Method 3: Run from Terminal

Instead of running from IntelliJ, run from terminal to see clearer output:

```bash
cd /home/qwerty/eventTic/backend
mvn spring-boot:run
```

This will show the complete error output.

## What to Look For

The error message should look like:
```
java.lang.ExceptionInInitializerError
    at com.codestars.ticketing.SomeClass.<init>(SomeClass.java:XX)
    at ...
Caused by: java.lang.SomeException: The actual problem
    at ...
```

**The "Caused by" section is the most important part!**

## Common Causes of ExceptionInInitializerError

1. **Static initializer block failure** - Check for `static { }` blocks
2. **Static field initialization failure** - Check for `static final` fields
3. **Missing dependencies** - Check if all Maven dependencies are loaded
4. **Class loading issues** - Check for circular dependencies
5. **Configuration errors** - Check `application.properties`

## Quick Fix: Try This First

1. **Invalidate Caches**: File → Invalidate Caches → Invalidate and Restart
2. **Rebuild Project**: Build → Rebuild Project
3. **Reload Maven**: Maven tool window → Reload All Maven Projects (🔄)
4. **Check Java Version**: File → Project Structure → Project → SDK = Java 11

## Send Me the Full Error

Please copy and send:
- The **complete stack trace** (all lines from the error)
- The **"Caused by"** section
- Any **red text** from the console

This will help me identify the exact problem!

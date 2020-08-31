# Script Tools 2.0.0
Collection of basic javascript tools.

The objective of this library is to offer tools that improve the workflow to build htmlElements in basic settings. Mainly adding the capability of creating such elements in a declarative way. Useful in browser and electron-like apps.

# Contents
- **src**:
  Folder with the code.
  - **htmlize**:
    Receives an object and returns an &lt;element&gt;. At date it can make any possible type of element with the rigth object.
  - **tablize**:
    Receives an object and returns a &lt;table&gt; filled with data.
- **min**:
  The minified version of the scripts.
- **examples**:
  A mix of documentation and examples that shows how to work with these tools.

# How to use
Copy & Reference the scripts.

The utility functions are:
  - **ScrTools.htmlize**
  Dependencies: none
  - **ScrTools.tablize**
  Dependencies: ScrTools.htmlize

I recommend you to check out the examples.

# btw
It is compatible with IE (at least the last version, I don't intent to test it everywhere).
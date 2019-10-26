# script_tools
Collection of basic javascript tools. (Right now only two)

The objective of this library is to offer tools that improve the workflow of basic operations like creating a &lt;table&gt; or any other &lt;element&gt;.

# Contents
- **script_tools**:
  Folder with the scripts.
  - **advancedCreateE**:
    Receives an object and returns an &lt;element&gt;. You can define anything of the output &lt;element&gt; through the object parameter. (Tell me if I am missing something.)
  - **parseTablableData**:
    Receives an object and returns a &lt;table&gt;. the property can have two properties: meta and data.
      meta must contain an array. Each element will represent each column of the output &lt;table&gt;.
      data is the actual data that makes up the &lt;tbody&gt;, it has to be an array of objects. Each object will translate into one &lt;tr&gt;.
- **min**:
  The minified version of the scripts.
- **examples**:
  A mix of documentation and examples that shows how to work with these tools.

# How to use
Copy the scripts to wherever you want to use them. Then you can access the utility function with your own script.

The utility functions are:
 - **script_tools.advancedCreateE** (aka **add$**(by me), but not by default)
 - **script_tools.parseTablableData**

I recommend you to check out the examples.

# btw
It is compatible with IE (at least the last version, I don't intent to test it everywhere).
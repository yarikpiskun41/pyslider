# pyslider
This is small, easy plugin to integrate HTML prersentation with ```<svg></svg>``` tags to your web site

# How to use
- Just add folder "pyslider" to your project
- Use [Aspose.app], [Convert.io] or another presentation converter which convert  your presentation to set of svg tags into one .html file
- Put your HTML presentation file into "pyslider/presentations" folder
- Connect the slider using the following code
```sh
 <script type="module" src="[root to folder with 'pyslider']/pyslider/index.js"></script>
```
- Provide a container for presntation and add pyslider component with a name of your presentation file
```sh
<div  class="[Just container]">
    <div class="pyslider" data-presentationname="[your presentation file name]">
    </div>
</div>
```

# Styling & Customization
You can add the following data attributes to customize slider:
```sh
 data-controlarrows="true" // Show Next Slide and Prervious Slide arrows
 data-arrowcolor="#43AAAA" // Change your arrow color
 data-arrowsize="5rem" // Change your arrow size
 data-showslidenumber="true" // If small window with slide number should display
 data-slidernumbersize="1.5rem" // Change number slide number size
```
You can also use CSS to style components



# Example HTML
```sh
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Example pyslider</title>
    </head>
    <style>
        .container {
            width: 50vw;
            margin: auto;
            height: 50vh;
            background-color: rgb(116, 187, 187);
            padding: 20px 0;
            margin-bottom: 2rem;
        }

    </style>
    <body>
        <div  class="container">
            <div class="pyslider" data-presentationname="example">
            </div>
        </div>

        <div class="full-container">
            <div class="pyslider" data-presentationname="example"
             data-controlarrows="true"
             data-arrowcolor="#43AAAA"
             data-arrowsize="5rem"
             data-showslidenumber="true"
             data-slidernumbersize="1.5rem">
            </div>
        </div>
        <script src="./pyslider/index.js"></script>

    </body>
</html>

```

[Aspose.app]: <https://products.aspose.app/slides/conversion/pptx-to-html>
[Convert.io]: <https://convertio.co/ppt-html/>

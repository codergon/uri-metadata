# uri-metadata

uri-metadata is a TypeScript library for extracting metadata information, including Twitter and Open Graph properties, from any HTTP/HTTPS URL. It is specifically designed to be useful in development of Chrome extensions.

## Highlights

- [Passing in a callback](#options)

## Installation

```
npm install uri-metadata --save
```

## Usage

Fetch metadata using the provided example below, which returns a Promise:

```javascript
import metadata from "uri-metadata";

try {
  const response = await metadata.get("https://awwwards.com");
  console.log("Metadata: ", response);
} catch (err) {
  console.log("An error occurred: ", err);
}
```

Alternatively, you can pass a callback function:

```javascript
import metadata from "uri-metadata";

metadata.get("https://awwwards.com", (data, err) => {
  console.log(err ? err : data);
});
```

The response is an object containing the URL metadata grouped by type:

```javascript
{
  meta: {
    'theme-color': '#3ea094',
    referrer: 'origin-when-cross-origin',
    keywords: 'Website Awards, Web Design Inspiration, Webdesign Trends',
    ...
  },
  og: {
    type: 'website',
    site_name: 'Awwwards',
    ...
  },
  twitter: {
    ...
  }
}
```

## Options

You can pass `true` or `false` as a third argument to group or ungroup metatags (defaults to `true`). For example:

```javascript
response = await metadata.get("https://www.awwwards.com", false);
```

This returns:

```javascript
{
  'og:type': 'website',
  'theme-color': '#3ea094',
  'og:site_name': 'Awwwards',
  referrer: 'origin-when-cross-origin',
  keywords: 'Website Awards, Web Design Inspiration, Webdesign Trends',
  ...
}
```

## Contributing

1. Fork the repository and create your feature branch: `git checkout -b my-update`
2. Commit your changes: `git commit -am 'Updated some parts'`
3. Push to the branch: `git push origin my-update`
4. Submit a pull request

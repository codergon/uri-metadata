# uri-metadata

Extract metadata information including Twitter and Open Graph properties from any http/https url

## Highlights

- Written in TypeScript
- Actively maintained
- [Passing in a callback](#options)

## Installation

```
npm install uri-metadata --save
```

## Usage

Fetch metadata as shown below (returns a Promise)

```javascript
import metadata from "uri-metadata";

try {
  const response = await metadata.get("https://awwwards.com");
  console.log("Metadata: ", response);
} catch (err) {
  console.log("An error occurred: ", err);
}
```

If a callback is provided

```javascript
import metadata from "uri-metadata";

metadata.get("https://awwwards.com", (data, err) => {
  console.log(err ? err : data);
});
```

Returns an object containing the url metadata grouped by type

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

Pass in true/false as a third argument to group or ungroup metatags(defaults to true). For example,

```javascript
response = await metadata.get("https://www.awwwards.com", false);
```

which returns

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

1. Fork Repo and create your feature branch: `git checkout -b my-update`
2. Commit your changes: `git commit -am 'Updated some parts'`
3. Push to the branch: `git push origin my-update`
4. Submit a pull request

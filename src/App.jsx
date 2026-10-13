import React from 'react';
import {
  ServerRenderer,
  registerPlatformComponents,
  DataProviderGeneric,
  Iterator,
  useIterationData
} from 'zambool';

const CONTENT_URL =
  "https://zambool-gallery-933344993326-ap-south-1-an.s3.ap-south-1.amazonaws.com/content";

function BoxIC({
  as = "div",
  renderIf,
  className,
  fieldNameIterator,
  ...props
}) {
  const renderValue = useIterationData(renderIf ?? null);
  const fieldContent = useIterationData(fieldNameIterator);

  if (renderIf && !renderValue) {
    return null;
  }

  return React.createElement(
    as,
    {
      ...props,
      className,
    },
    fieldContent
  );
}

export function Thumbnail({ srcField, className }) {
  const src = useIterationData(srcField);

  return (
    <img
      src={src}
      className={className}
    />
  );
}

registerPlatformComponents({
  DataProviderGeneric, Iterator,
  BoxIC, Thumbnail,
});

function App() {
  const [gallery, setGallery] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch(`${CONTENT_URL}/gallery.json`, {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(setGallery)
      .catch((err) => {
        console.error("Failed to load gallery:", err);
        setError(err.message);
      });
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href={`${CONTENT_URL}/reset.css`}
      />
      <link
        rel="stylesheet"
        href={`${CONTENT_URL}/gallery.css`}
      />

      {error ? (
        <p>Failed to load gallery: {error}</p>
      ) : gallery === null ? (
        <p>Loading gallery...</p>
      ) : (
        <ServerRenderer tree={gallery} />
      )}
    </>
  );
}

export default App

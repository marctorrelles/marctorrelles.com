---
title: React patterns to avoid
short: >
  On this article, I'm showing some patterns that I see constantly when programming in React. Trying
  to escape the basic "Prop drilling" or "Big components", that are very well known.
author: Marc Torrelles
date: "2023-09-07T00:00:00.000Z"
hero_image: /react-patterns-to-avoid/hero.jpg
hidden: true
---

Hey there! When programming we tend to go automatic a lot of times: we learn once, we apply forever.
This is cool, but some patterns in Reactthat I see very often can be easily avoided just paying some
more attention.

Let's see which are these, and make sure to pay attention next time you are reviewing these PRs!

# Nested renders in components

```tsx
function MyComponent ({ children, count }: React.ChildrenWithProps<Props>) {
  function renderElement () {
    return (
      <SomeComponent>
        {count === 0 ? <ZeroCount /> : <OtherCount />}
      </SomeComponent>
    )
  }

  function renderOtherElement () {
    return (
      <MyThing>
        <MyOtherThing>
          <MyThirdThing />
        </MyOtherThing>
      </MyThing>
    )
  }

  return {
    <Page>
      {renderElement()}
      {renderOtherElement()}
    </Page>
  }
}
```

# Mixing logic with views

Bla bla bla bla, you know

# useRef with expenses calculations

```tsx
function MyComponent() {
  const myRef = useRef(complexComputation()).current
}
```

# Over use of useMemo and useCallback

...

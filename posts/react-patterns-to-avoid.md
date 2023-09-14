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
This is cool, but some very bad patterns in React that I see very often can be easily avoided just
paying some more attention.

Let's see which are these. And make sure to pay attention next time you are reviewing these Pull
Requests!

# Nested renders in components

Let's see the following example. Do you see something wrong?

```tsx
function ParentComponent ({ children, count }: React.ChildrenWithProps<Props>) {
  function InnerComponent () {
    return (
      <SomeComponent>
        {count === 0 ? <ZeroCount /> : <OtherCount />}
      </SomeComponent>
    )
  }

  return {
    <Component>
      <InnerComponent />
    </Component>
  }
}
```

Here, we are instantiating `InnerComponent` each time that `ParentComponent` renders. This has a
couple of serious implications.

Firs, we are forcing `ParentComponent` to instantiate `InnerComponent` each time that it renders,
which hits in performance as we need to free and allocate resources for that new component.

But moreover, it has a serious implications in terms of the lifecycle that a React component should
follow. Each time that `ParentComponent` renders, `InnerComponent` is mounted and unmounted, so it
would reset all the hooks that react when it mounts or unmounts, breaking the expected behviour we
would expect.

You can check a more detailed example in
[this CodeSandbox](https://codesandbox.io/s/child-component-inside-a-parent-component-4fyvjm).

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

---
title: helpers
---

# helpers

## Functions

<dl>
<dt><a href="#mappedPropsToVueProps">mappedPropsToVueProps(props)</a></dt>
<dd><p>Strips out the extraneous properties we have in our
props definitions</p>
</dd>
<dt><a href="#twoWayBindingWrapper">twoWayBindingWrapper()</a></dt>
<dd><p>When you have two-way bindings, but the actual bound value will not equal
the value you initially passed in, then to avoid an infinite loop you
need to increment a counter every time you pass in a value, decrement the
same counter every time the bound value changed, but only bubble up
the event when the counter is zero.</p>
<p>Example:</p>
<p>Let&#39;s say DrawingRecognitionCanvas is a deep-learning backed canvas
that, when given the name of an object (e.g. &#39;dog&#39;), draws a dog.
But whenever the drawing on it changes, it also sends back its interpretation
of the image by way of the @newObjectRecognized event.</p>
<p><input
  type="text"
  placeholder="an object, e.g. Dog, Cat, Frog"
  v-model="identifiedObject" />
&lt;DrawingRecognitionCanvas
  :object=&quot;identifiedObject&quot;</p>
</dd>
<dt><a href="#watchPrimitiveProperties">watchPrimitiveProperties()</a></dt>
<dd><p>Watch the individual properties of a PoD object, instead of the object
per se. This is different from a deep watch where both the reference
and the individual values are watched.</p>
<p>In effect, it throttles the multiple $watch to execute at most once per tick.</p>
</dd>
<dt><a href="#bindProps">bindProps()</a></dt>
<dd><p>Binds the properties defined in props to the google maps instance.
If the prop is an Object type, and we wish to track the properties
of the object (e.g. the lat and lng of a LatLng), then we do a deep
watch. For deep watch, we also prevent the _changed event from being
emitted if the data source was external.</p>
</dd>
</dl>

<a name="mappedPropsToVueProps"></a>

## mappedPropsToVueProps(props)
Strips out the extraneous properties we have in our
props definitions

**Kind**: global function  

| Param | Type |
| --- | --- |
| props | <code>Object</code> | 

<a name="twoWayBindingWrapper"></a>

## twoWayBindingWrapper()
When you have two-way bindings, but the actual bound value will not equal
the value you initially passed in, then to avoid an infinite loop you
need to increment a counter every time you pass in a value, decrement the
same counter every time the bound value changed, but only bubble up
the event when the counter is zero.

Example:

Let's say DrawingRecognitionCanvas is a deep-learning backed canvas
that, when given the name of an object (e.g. 'dog'), draws a dog.
But whenever the drawing on it changes, it also sends back its interpretation
of the image by way of the @newObjectRecognized event.

<input
  type="text"
  placeholder="an object, e.g. Dog, Cat, Frog"
  v-model="identifiedObject" />
<DrawingRecognitionCanvas
  :object="identifiedObject"

**Kind**: global function  
**Newobjectrecognized&#x3D;&quot;identifiedobject**: = $event"
  />

new TwoWayBindingWrapper((increment, decrement, shouldUpdate) => {
  this.$watch('identifiedObject', () => {
    // new object passed in
    increment()
  })
  this.$deepLearningBackend.on('drawingChanged', () => {
    recognizeObject(this.$deepLearningBackend)
      .then((object) => {
        decrement()
        if (shouldUpdate()) {
          this.$emit('newObjectRecognized', object.name)
        }
      })
  })
})  
<a name="watchPrimitiveProperties"></a>

## watchPrimitiveProperties()
Watch the individual properties of a PoD object, instead of the object
per se. This is different from a deep watch where both the reference
and the individual values are watched.

In effect, it throttles the multiple $watch to execute at most once per tick.

**Kind**: global function  
<a name="bindProps"></a>

## bindProps()
Binds the properties defined in props to the google maps instance.
If the prop is an Object type, and we wish to track the properties
of the object (e.g. the lat and lng of a LatLng), then we do a deep
watch. For deep watch, we also prevent the _changed event from being
emitted if the data source was external.

**Kind**: global function  

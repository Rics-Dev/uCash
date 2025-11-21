SwiftUI




Ask AI

SwiftUI components for building native iOS interfaces with @expo/ui.

Bundled version:
~0.2.0-beta.7

Copy page

This library is currently in beta and subject to breaking changes. It is not available in the Expo Go app — use development builds to try it out.
The SwiftUI components in @expo/ui/swift-ui allow you to build fully native iOS interfaces using SwiftUI from React Native.

Installation
Terminal

Copy

npx expo install @expo/ui
If you are installing this in an existing React Native app, make sure to install expo in your project.

Usage
Using a component from @expo/ui/swift-ui requires wrapping it in a Host component. The Host is a container for SwiftUI views.

import { Host, Button } from '@expo/ui/swift-ui';

export function SaveButton() {
  return (
    <Host style={{ flex: 1 }}>
      <Button variant="default">Save changes</Button>
    </Host>
  );
}
For an in-depth explanation of how Host works, see the following resources:

Expo UI guide for Swift UI
Learn about the basics of @expo/ui/swift-ui

Expo UI iOS Liquid Glass Tutorial
Expo UI iOS Liquid Glass Tutorial
Learn how to build real SwiftUI views in your React Native app with the new Expo UI.

Components
BottomSheet

iOS


Code

import { BottomSheet, Host, Text } from '@expo/ui/swift-ui';
import { useWindowDimensions } from 'react-native';

const { width } = useWindowDimensions();

<Host style={{ position: 'absolute', width }}>
  <BottomSheet isOpened={isOpened} onIsOpenedChange={e => setIsOpened(e)}>
    <Text>Hello, world!</Text>
  </BottomSheet>
</Host>
See also: official SwiftUI documentation

Button
The borderless variant is not available on Apple TV.

iOS


Code

import { Button, Host } from '@expo/ui/swift-ui';

<Host style={{ flex: 1 }}>
  <Button
    variant="default"
    onPress={() => {
      setEditingProfile(true);
    }}>
    Edit profile
  </Button>
</Host>
See also: official SwiftUI documentation

CircularProgress

iOS


Code

import { CircularProgress, Host } from '@expo/ui/swift-ui';

<Host style={{ width: 300 }}>
  <CircularProgress progress={0.5} color="blue" />
</Host>
See also: official SwiftUI documentation

ColorPicker
This component is not available on Apple TV.

iOS


Code

import { ColorPicker, Host } from '@expo/ui/swift-ui';

<Host style={{ width: 400, height: 200 }}>
  <ColorPicker
    label="Select a color"
    selection={color}
    onValueChanged={setColor}
  />
</Host>
See also: official SwiftUI documentation

ContextMenu
Note: Also known as DropdownMenu.


iOS


Code

import { ContextMenu, Host } from '@expo/ui/swift-ui';

<Host style={{ width: 150, height: 50 }}>
  <ContextMenu>
    <ContextMenu.Items>
      <Button
        systemImage="person.crop.circle.badge.xmark"
        onPress={() => console.log('Pressed1')}>
        Hello
      </Button>
      <Button
        variant="bordered"
        systemImage="heart"
        onPress={() => console.log('Pressed2')}>
        Love it
      </Button>
      <Picker
        label="Doggos"
        options={['very', 'veery', 'veeery', 'much']}
        variant="menu"
        selectedIndex={selectedIndex}
        onOptionSelected={({ nativeEvent: { index } }) => setSelectedIndex(index)}
      />
    </ContextMenu.Items>
    <ContextMenu.Trigger>
      <Button variant="bordered">
        Show Menu
      </Button>
    </ContextMenu.Trigger>
  </ContextMenu>
</Host>

Show More
See also: official SwiftUI documentation

DateTimePicker (date)
This component is not available on Apple TV.

iOS


Code

import { DateTimePicker, Host } from '@expo/ui/swift-ui';

<Host matchContents>
  <DateTimePicker
    onDateSelected={date => {
      setSelectedDate(date);
    }}
    displayedComponents='date'
    initialDate={selectedDate.toISOString()}
    variant='wheel'
  />
</Host>
See also: official SwiftUI documentation

DateTimePicker (time)
This component is not available on Apple TV.

iOS


Code

import { DateTimePicker, Host } from '@expo/ui/swift-ui';

<Host matchContents>
  <DateTimePicker
    onDateSelected={date => {
      setSelectedDate(date);
    }}
    displayedComponents='hourAndMinute'
    initialDate={selectedDate.toISOString()}
    variant='wheel'
  />
</Host>
See also: official SwiftUI documentation

Gauge
This component is not available on Apple TV.

iOS


Code

import { Gauge, Host } from "@expo/ui/swift-ui";

<Host matchContents>
  <Gauge
    max={{ value: 1, label: '1' }}
    min={{ value: 0, label: '0' }}
    current={{ value: 0.5 }}
    color={[
      PlatformColor('systemRed'),
      PlatformColor('systemOrange'),
      PlatformColor('systemYellow'),
      PlatformColor('systemGreen'),
    ]}
    type="circularCapacity"
  />
</Host>
See also: official SwiftUI documentation

Host
A component that allows you to put the other @expo/ui/swift-ui components in React Native. It acts like <svg> for DOM, <Canvas> for react-native-skia, which underlying uses UIHostingController to render the SwiftUI views in UIKit.

Since the Host component is a React Native View, you can pass the style prop to it or matchContents prop to make the Host component match the contents' size.

Wrapping Button in Host

Copy


import { Button, Host } from '@expo/ui/swift-ui';

function Example() {
  return (
    <Host matchContents>
      <Button
        onPress={() => {
          console.log('Pressed');
        }}>
        Click
      </Button>
    </Host>
  );
}
Host with flexbox and VStack

Copy


import { Button, Host, VStack, Text } from '@expo/ui/swift-ui';

function Example() {
  return (
    <Host style={{ flex: 1 }}>
      <VStack spacing={8}>
        <Text>Hello, world!</Text>
        <Button
          onPress={() => {
            console.log('Pressed');
          }}>
          Click
        </Button>
      </VStack>
    </Host>
  );
}
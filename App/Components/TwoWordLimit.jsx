import React from 'react';
import { Text } from 'react-native';

function TwoWordText({ text }) {
  const words = text.split(/\s+/);
  const twoWords = words.slice(0, 2).join(' ');

  return <Text>{twoWords}</Text>;
}

export default TwoWordText;
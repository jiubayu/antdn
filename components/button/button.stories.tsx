import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './index';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Button',
    component: Button,
  } as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
    <Button {...args} />
)

export const Basic = Template.bind({});
Basic.args = {
    children: '按钮'
}
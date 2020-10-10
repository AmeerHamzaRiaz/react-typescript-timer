import React from 'react';
import { getByText, render, fireEvent, wait } from '@testing-library/react';
import Timer from './components/Timer';

test('Render three button on screen', () => {
  const { getAllByRole } = render(<Timer />);
  const allButtons = getAllByRole('button');
  expect(allButtons).toHaveLength(3)
});

test('When start is pressed, it becomes disabled', () => {
  const { getByTestId } = render(<Timer />);
  const startButton = getByTestId(/start/i);
  const stopButton = getByTestId(/stop/i);
  fireEvent.click(startButton);
  expect(startButton).toBeDisabled();
  expect(stopButton).toBeEnabled();
});

test('When stop is pressed, it becomes disabled', () => {
  const { getByTestId } = render(<Timer />);
  const stopButton = getByTestId(/stop/i);
  const startButton = getByTestId(/start/i);
  fireEvent.click(stopButton);
  expect(stopButton).toBeDisabled();
  expect(startButton).toBeEnabled();
});

test('Cannot reset timer while it is running', () => {
  const { getByTestId } = render(<Timer />);
  const resetButton = getByTestId(/reset/i);
  const startButton = getByTestId(/start/i);
  fireEvent.click(startButton);
  expect(resetButton).toBeDisabled();
});

test('Reset button changes timer to zero', () => {
  const { getByTestId, getByRole } = render(<Timer />);
  const resetButton = getByTestId(/reset/i);
  const heading = getByRole('timer');
  fireEvent.click(resetButton);
  expect(heading.textContent).toEqual("00:00:00")
});

export default function (
  initial: number,
  final: number,
): {percentage: number; type: 'down' | 'up'; difference: number} {
  if (initial === 0) {
    return {
      percentage: 0,
      type: 'up',
      difference: 0,
    };
  }

  const difference = final - initial;
  const percentage = Math.abs((difference / initial) * 100);

  return {
    percentage: parseFloat(percentage.toFixed(2)),
    type: difference > 0 ? 'up' : 'down',
    difference,
  };
}

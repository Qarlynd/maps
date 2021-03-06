module.exports = ({
  size,
  color,
  fontcolor,
  fontsize,
  label
}) => `
<svg height="${size}" width="${size}" font-family="FleischWurst">
  <circle cx="50%" cy="50%" r="47%" fill="${color}" stroke="#f4f6ff" stroke-width="3.5%"/>
  <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#07031a" stroke-width="2.5%" />
  <text dy=".3em" x = "50%" y = "50%" text-anchor="middle" fill="${fontcolor}" font-family="FleischWurst" font-size="${fontsize}">${label}</text>
</svg>
`;

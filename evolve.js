$(function(){

const version = '1.0.3';
$('#version').text(version);

const global = { race: { species: ''} };
let achievementCount = featCount = 0;
let saveData = {
	achievements: {},
	feats: {},
	genes: {}
};

const icons = {
	standard: {
		path: '<path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z" />',
		viewbox: '0 0 640 640'
	},
	heavy: {
		path: '<path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />',
		viewbox: '0 0 24 24'
	},
	micro: {
		path: '<path d="m150.18 114.71c-11.276-6.0279-15.771-19.766-9.9989-30.563 6.0279-11.276 19.766-15.771 30.563-9.9989 11.276 6.0279 15.771 19.766 9.9989 30.563-6.0279 11.276-19.766 15.771-30.563 9.9989z" /><path d="m47.263 265.24c-0.41891-0.4189-0.76165-5.194-0.76165-10.611 0-11.606 2.7184-18.417 9.0231-22.606 3.8412-2.5527 4.2946-2.5798 43.128-2.5798h39.246v-13.71-13.71h10.905c10.055 0 11.124-0.2186 13.71-2.8043 2.5824-2.5824 2.8043-3.66 2.8043-13.619v-10.815l3.3639-0.73883c1.8501-0.40636 5.1713-2.7395 7.3804-5.1847 8.0637-8.9255 9.8103-25.642 3.9223-37.54l-2.9588-5.9787 5.9675-5.9676c9.887-9.887 12.537-24.129 6.6886-35.949-1.3037-2.635-2.1165-4.7908-1.8062-4.7908 0.31024 0 3.5239 1.798 7.1414 3.9955 14.491 8.8026 26.675 25.759 31.636 44.025 2.7168 10.004 2.7314 30.947 0.0286 41.093-4.445 16.685-15.856 33.364-29.027 42.425l-4.9176 3.3834v7.9424 7.9424h10.966c12.713 0 17.226 1.5998 21.944 7.7794 2.828 3.7038 3.1086 5.033 3.464 16.405l0.4 12.38h-90.737c-49.906 0-91.08-0.34274-91.499-0.76165zm17.518-81.497v-9.1398h45.699 45.699v9.1398 9.1398h-45.699-45.699v-9.1398zm32.227-32.318-4.8078-4.8988v-13.72-13.72l-4.5699-4.4624-4.5699-4.4624v-27.527-27.527l4.5699-4.4624c4.5593-4.452 4.5699-4.4831 4.5699-13.37 0-8.6703-0.07402-8.9079-2.7746-8.9079-4.4514 0-6.3652-2.8757-6.3652-9.5641 0-3.2854 0.61694-6.5904 1.371-7.3445 1.9422-1.9422 50.155-1.9422 52.097 0 0.75403 0.75403 1.371 4.3347 1.371 7.9571 0 6.9911-1.4848 8.9515-6.7797 8.9515-2.1833 0-2.3601 0.66715-2.3601 8.9079 0 8.8872 0.0103 8.9183 4.5699 13.37l4.5699 4.4624v9.5554c0 8.412-0.33908 10-2.8338 13.271-6.443 8.4472-7.9966 20.22-4.0419 30.628 2.2572 5.9405 2.2572 5.9661 0 8.3688-1.997 2.1258-2.2642 4.0244-2.2642 16.094v13.684l-4.8988 4.8078c-4.877 4.7864-4.9369 4.8078-13.472 4.8078h-8.5731l-4.8078-4.8988z" />',
		viewbox: '0 0 276 276'
	},
	evil: {
		path: '<path d="m105.63 236.87c-17.275-2.22-34.678-8.73-49.291-18.44-54.583-36.26-69.355-108.23-33.382-162.64 11.964-18.101 31.389-34.423 51.05-42.899 36.303-15.652 78.013-12.004 110.65 9.678 54.58 36.259 69.36 108.23 33.38 162.65-24.44 36.97-68.62 57.27-112.41 51.65zm9.37-7.17c0-1.12-15.871-50.86-20.804-65.2l-1.719-5-36.926-0.26c-20.309-0.15-37.284 0.09-37.721 0.53-1.104 1.1 4.147 11.87 10.535 21.59 16.439 25.04 41.149 41.59 71.135 47.65 11.07 2.24 15.5 2.44 15.5 0.69zm25.71-0.61c30.52-5.95 55.28-22.38 71.92-47.73 6.39-9.72 11.64-20.49 10.54-21.59-0.44-0.44-17.41-0.68-37.72-0.53l-36.93 0.26-1.72 5c-4.93 14.34-20.8 64.08-20.8 65.2 0 1.77 3.2 1.64 14.71-0.61zm-9.32-38.99c5.25-16.18 9.3-29.79 9.01-30.25-0.28-0.47-9.24-0.85-19.9-0.85s-19.62 0.38-19.9 0.85c-0.46 0.74 17.66 58.14 19.08 60.43 0.3 0.49 0.91 0.52 1.36 0.06s5.11-14.07 10.35-30.24zm-42.19-38.63c0.629-0.63-10.723-36.39-11.936-37.61-0.817-0.81-51.452 35.32-52.097 37.18-0.349 1 63.032 1.43 64.033 0.43zm61.27-20.06c3.65-11.32 6.51-21.41 6.34-22.42-0.32-1.86-34.12-26.99-36.31-26.99s-35.993 25.13-36.308 26.99c-0.169 1.01 2.683 11.1 6.339 22.42l6.647 20.59h46.642l6.65-20.59zm65.36 19.63c-0.64-1.86-51.28-37.99-52.09-37.18-1.22 1.22-12.57 36.98-11.94 37.61 1 1 64.38 0.57 64.03-0.43zm-169.97-24.02c16.09-11.7 29.071-21.78 28.847-22.4-0.397-1.09-12.185-37.499-18.958-58.555-1.846-5.739-3.951-10.632-4.678-10.875-0.727-0.242-4.903 3.259-9.28 7.78-22 22.72-32.81 50.641-31.513 81.39 0.678 16.09 2.371 24.97 4.646 24.37 0.925-0.24 14.846-10.01 30.936-21.71zm183.14 15.73c0.66-3.44 1.44-11.71 1.72-18.39 1.3-30.749-9.51-58.67-31.51-81.39-4.38-4.521-8.55-8.022-9.28-7.78-0.73 0.243-2.83 5.136-4.68 10.875-1.84 5.739-6.93 21.448-11.29 34.908-6.26 19.297-7.68 24.717-6.7 25.627 3.41 3.18 58.29 42.4 59.32 42.4 0.68 0 1.73-2.72 2.42-6.25zm-129.27-54.808c7.573-5.522 13.773-10.467 13.773-10.987 0-1.007-50.318-37.955-51.689-37.955-0.446 0-0.811 0.317-0.811 0.704 0 0.388 3.825 12.484 8.5 26.882s8.5 26.401 8.5 26.674 0.697 2.163 1.548 4.201c1.832 4.389-0.216 5.349 20.179-9.519zm66.613-5.442c3.03-9.35 7.35-22.629 9.59-29.508 4.36-13.403 4.5-13.992 3.26-13.992-1.39 0-51.69 36.953-51.69 37.971 0 1.477 31.75 24.189 32.58 23.309 0.4-0.431 3.22-8.43 6.26-17.78zm-14.4-32.538l29.32-21.329-2.37-1.927c-10.93-8.844-38.4-16.706-58.39-16.706s-47.464 7.862-58.388 16.708l-2.382 1.929 29.885 21.728c16.845 12.25 30.565 21.552 31.435 21.326 0.86-0.22 14.75-9.999 30.89-21.729z" />',
		viewbox: '0 0 240 240'
	},
	antimatter: {
		path: '<path d="m100 44.189c0-6.796-10.63-11.822-24.783-14.529 1.155-3.322 2.105-6.538 2.764-9.541 2.193-10.025 1.133-16.856-2.981-19.231-1.019-0.588-2.193-0.888-3.49-0.888-5.62 0-13.46 5.665-21.509 15-8.046-9.335-15.886-15-21.511-15-1.294 0-2.47 0.3-3.491 0.888-5.891 3.4-4.918 15.141-0.175 28.767-14.173 2.701-24.824 7.731-24.824 14.534 0 6.799 10.634 11.822 24.79 14.531-1.161 3.323-2.11 6.536-2.767 9.539-2.194 10.027-1.136 16.857 2.976 19.231 1.021 0.589 2.197 0.886 3.491 0.886 5.625 0 13.464-5.667 21.511-14.998 8.047 9.331 15.886 15 21.509 15 1.297 0 2.472-0.299 3.49-0.888 4.114-2.374 5.174-9.204 2.98-19.231-0.658-3.003-1.608-6.216-2.766-9.539 14.156-2.708 24.786-7.732 24.786-14.531zm-28.49-41.605c0.838 0 1.579 0.187 2.199 0.543 3.016 1.741 3.651 7.733 1.747 16.44-0.661 3.022-1.628 6.264-2.814 9.63-4.166-0.695-8.585-1.194-13.096-1.49-2.572-3.887-5.206-7.464-7.834-10.67 7.581-8.861 14.934-14.453 19.798-14.453zm-9.198 48.71c-1.375 2.379-2.794 4.684-4.242 6.9-2.597 0.132-5.287 0.206-8.069 0.206s-5.474-0.074-8.067-0.206c-1.452-2.217-2.87-4.521-4.242-6.9-1.388-2.406-2.669-4.771-3.849-7.081 1.204-2.369 2.477-4.753 3.851-7.13 1.37-2.377 2.79-4.68 4.24-6.901 2.593-0.131 5.285-0.205 8.067-0.205s5.473 0.074 8.069 0.205c1.448 2.222 2.866 4.524 4.239 6.901 1.37 2.37 2.64 4.747 3.842 7.106-1.202 2.362-2.471 4.739-3.839 7.105zm5.259-4.225c1.587 3.303 3 6.558 4.2 9.72-3.25 0.521-6.758 0.926-10.488 1.203 1.104-1.75 2.194-3.554 3.265-5.404 1.062-1.837 2.059-3.681 3.023-5.519zm-11.277 13.78c-2.068 3.019-4.182 5.854-6.293 8.444-2.109-2.591-4.22-5.426-6.294-8.444 2.095 0.088 4.196 0.138 6.294 0.138 2.099-0.001 4.201-0.05 6.293-0.138zm-17.573-2.857c-3.733-0.277-7.241-0.683-10.49-1.203 1.202-3.157 2.611-6.414 4.197-9.72 0.97 1.858 1.979 3.701 3.026 5.519 1.071 1.85 2.161 3.654 3.267 5.404zm-6.304-16.654c-1.636-3.389-3.046-6.653-4.226-9.741 3.26-0.52 6.781-0.931 10.53-1.212-1.107 1.751-2.197 3.553-3.268 5.407-1.067 1.847-2.065 3.701-3.036 5.546zm11.294-13.805c2.07-3.019 4.181-5.855 6.29-8.449 2.111 2.594 4.225 5.43 6.293 8.449-2.093-0.091-4.194-0.14-6.293-0.14-2.098 0.001-4.199 0.049-6.29 0.14zm20.837 8.259c-1.07-1.859-2.16-3.656-3.265-5.407 3.73 0.281 7.238 0.687 10.488 1.205-1.2 3.157-2.613 6.419-4.2 9.722-0.964-1.838-1.961-3.683-3.023-5.52zm-38.254-32.665c0.619-0.359 1.36-0.543 2.196-0.543 4.864 0 12.217 5.592 19.8 14.453-2.626 3.206-5.262 6.783-7.834 10.67-4.526 0.296-8.962 0.802-13.144 1.5-4.886-13.794-5.036-23.762-1.018-26.08zm-23.709 41.062c0-4.637 8.707-9.493 23.096-12.159 1.487 3.974 3.268 8.069 5.277 12.14-2.061 4.14-3.843 8.229-5.323 12.167-14.364-2.664-23.05-7.516-23.05-12.148zm25.905 41.605c-0.848 0-1.564-0.178-2.196-0.538-3.015-1.742-3.652-7.734-1.746-16.442 0.662-3.023 1.626-6.269 2.814-9.633 4.166 0.696 8.586 1.195 13.092 1.491 2.574 3.885 5.207 7.462 7.834 10.671-7.58 8.86-14.934 14.451-19.798 14.451zm46.962-16.981c1.907 8.708 1.272 14.7-1.743 16.442-0.623 0.355-1.361 0.539-2.199 0.539-4.864 0-12.217-5.592-19.798-14.452 2.628-3.209 5.262-6.786 7.837-10.671 4.508-0.296 8.927-0.795 13.093-1.491 1.186 3.365 2.153 6.61 2.81 9.633zm-1.086-12.475c-1.476-3.933-3.254-8.014-5.31-12.148 2.056-4.135 3.834-8.217 5.312-12.148 14.361 2.665 23.049 7.519 23.049 12.148 0 4.631-8.688 9.483-23.051 12.148z" />',
		viewbox: '0 0 100 88.379'
	},
	checkmark: {
		path: '<path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" />',
		viewbox: '0 0 20 20'
	},
	magic: {
		path: '<path d="m 2077.0957,2355.0556 c -24.8548,-6.6306 -43.8442,-12.4931 -65.1438,-20.1115 -171.2303,-61.2458 -332.546,-186.5828 -484.656,-376.562 -106.9479,-133.5736 -211.9033,-304.0752 -307.5304,-499.5874 -70.9505,-145.0603 -137.2376,-301.6744 -201.0755,-475.07329 -4.0445,-10.9859 -7.4891,-20.1129 -7.6546,-20.2824 -0.1656,-0.1694 -2.0374,1.7618 -4.1597,4.2917 -41.97221,50.03289 -102.85691,112.12769 -165.25321,168.53769 -153.4012,138.6841 -322.8342,254.6704 -451.2868,308.9308 -4.8375,2.0435 -9.6944,4.102 -10.793,4.5744 l -1.9977,0.8591 14.4133,7.0194 c 72.3515,35.2357 143.3639,78.5554 206.1228,125.7414 218.7562,164.4739 368.1707,393.9487 437.81411,672.4065 3.7109,14.8375 9.1943,38.7303 9.0117,39.2665 -0.069,0.2024 -1.3235,-3.0502 -2.788,-7.228 -74.09121,-211.3582 -207.71511,-385.1177 -394.71211,-513.2685 -102.107,-69.9749 -219.4845,-126.1019 -348.488,-166.6383 -76.1077,-23.9151 -155.9429,-42.2005 -232.883496,-53.3396 -6.991,-1.0121 -12.8528,-1.8883 -13.0261,-1.947 -0.1733,-0.059 2.0738,-1.6288 4.9936,-3.4891 2.9198,-1.8603 15.625,-10.0516 28.2339,-18.2031 204.092496,-131.9427 358.291896,-247.07 478.472596,-357.2338 37.0992,-34.0071 77.0506,-73.8638 107.6314,-107.3762 86.2451,-94.51319 148.9362,-188.57859 189.3356,-284.08999 30.7863,-72.7845 49.1302,-147.8337 55.0585,-225.2576 0.8677,-11.3324 1.6179,-24.3907 1.6179,-28.1635 l 0,-2.8677 -2.3833,-0.2589 c -5.6397,-0.6126 -53.3922,-2.328 -84.3238,-3.0291 -26.1322,-0.5923 -105.9829,-0.2965 -125.748,0.4658 -35.3648,1.3639 -61.1426,2.7941 -86.7072,4.8105 -195.6367,15.431 -343.0035,61.1297 -446.9275,138.593 -2.4968,1.8611 -4.029,2.8664 -3.4048,2.2341 0.9758,-0.9885 397.2225,-336.9788 399.0477,-338.3654 0.4983,-0.3785 8.2687,0.05 30.6293,1.691 273.5285,20.0676 411.83311,27.9616 556.33281,31.7538 29.6737,0.7788 110.952,1.0595 138.2321,0.4775 83.5286,-1.7821 143.7695,-6.6707 194.0695,-15.7487 47.0041,-8.4831 83.1621,-21.2812 103.3974,-36.5973 1.6154,-1.2226 2.9812,-2.1619 3.0353,-2.0872 0.054,0.075 -0.079,2.1785 -0.2952,4.6753 -0.578,6.6693 -0.5481,29.498 0.048,36.3171 3.3368,38.2002 14.0507,70.8483 33.8884,103.2667 18.8519,30.8073 47.6861,61.0826 82.1419,86.2473 37.3245,27.2597 81.564,49.9843 131.8765,67.7412 4.8688,1.7184 8.2555,3.0024 7.5259,2.8535 -0.7295,-0.1489 -6.3473,-1.3924 -12.484,-2.7634 -39.6642,-8.861 -104.6887,-20.5993 -168.0021,-30.328 -137.3768,-21.1093 -273.1583,-35.4146 -362.8049,-38.2235 l -9.8479,-0.3086 -0.224,1.0898 c -0.1233,0.5995 -0.335,2.5199 -0.4706,4.2677 -1.3397,17.2691 -1.7023,22.4205 -2.2846,32.4584 -2.3935,41.2643 -2.3955,89.1364 -0.01,134.8273 11.3803,217.5701 77.3475,473.27869 189.8401,735.87559 89.2575,208.3584 210.5193,422.3508 332.3606,586.5215 22.7139,30.605 33.0709,42.8702 44.5166,52.7187 25.6187,22.0437 46.811,23.8716 65.2335,5.6265 19.5207,-19.3327 34.7161,-60.9422 45.5423,-124.7077 19.3386,-113.9042 23.2932,-297.6572 10.9059,-506.7671 -4.6678,-78.7985 -10.1013,-140.5522 -20.8699,-237.1961 -5.9357,-53.2693 -7.4546,-65.7004 -8.6502,-70.7914 -4.7369,-20.171 -27.3114,-47.5028 -65.7926,-79.6576 -11.906,-9.9486 -20.1748,-16.4224 -39.1544,-30.6551 -8.4267,-6.3191 -15.3189,-11.6171 -15.3159,-11.7734 0,-0.1563 1.2797,-0.9816 2.8373,-1.8339 14.6036,-7.9917 42.9197,-26.1494 64.2088,-41.17369 35.0761,-24.7546 77.4208,-59.2093 108.4143,-88.2139 58.9609,-55.1774 106.4613,-109.4316 139.8321,-159.7139 2.693,-4.0578 4.9524,-7.3218 5.0209,-7.2532 0.069,0.068 -0.9793,4.6953 -2.3284,10.2819 -52.0714,215.624 -73.4586,458.30359 -63.0753,715.71049 8.1008,200.8217 36.667,415.9599 82.2909,619.7502 l 2.6625,11.8924 -4.124,2.8336 c -25.7438,17.6888 -44.4201,32.0283 -57.3292,44.017 -19.4405,18.0544 -30.6873,35.3946 -36.0405,55.5665 -3.2336,12.1849 -4.2393,21.7435 -4.2035,39.9489 0.043,21.9591 1.571,38.7035 9.4024,103.0498 1.3371,10.9859 2.4091,19.9949 2.3823,20.0199 -0.027,0.025 -1.8874,-0.445 -4.1345,-1.0444 z m 326.7144,-985.6489 c -17.4427,-32.7693 -52.6734,-76.4714 -96.8446,-120.1314 -30.3662,-30.0148 -57.7931,-52.8046 -81.5396,-67.7535 -6.8082,-4.2859 -19.6404,-11.0063 -22.8544,-11.9693 -0.9739,-0.2918 -1.7706,-0.6524 -1.7706,-0.8014 0,-0.149 1.2767,-0.754 2.8373,-1.3444 8.1023,-3.0654 22.7254,-11.5869 35.2957,-20.5684 21.4993,-15.3612 43.2465,-34.1516 68.6986,-59.358 42.609,-42.1976 76.3979,-83.8447 94.6619,-116.67699 2.2626,-4.0672 4.2245,-7.6252 4.36,-7.9065 0.1826,-0.3795 0.3097,-0.3795 0.4923,0 0.1354,0.2813 2.0845,3.8162 4.3314,7.8552 18.2956,32.88899 52.1844,74.66389 94.6871,116.72119 25.6446,25.3759 47.2008,44.0026 68.702,59.3651 12.5703,8.9815 27.1934,17.503 35.2957,20.5684 1.5605,0.5904 2.8373,1.1777 2.8373,1.3051 0,0.1274 -1.2768,0.7145 -2.8373,1.305 -1.5605,0.5904 -5.6973,2.5407 -9.1928,4.334 -24.7032,12.6736 -57.8306,39.0407 -94.1346,74.9245 -44.1711,43.66 -79.4018,87.3621 -96.8445,120.1314 -1.5749,2.9588 -2.9656,5.3796 -3.0904,5.3796 -0.1249,0 -1.5156,-2.4208 -3.0905,-5.3796 z M 166.36129,670.71331 c 0.452,-0.4994 0.9239,-0.9079 1.0487,-0.9079 0.1248,0 -0.1428,0.4085 -0.5947,0.9079 -0.4519,0.4993 -0.9238,0.9079 -1.0487,0.9079 -0.1248,0 0.1428,-0.4086 0.5947,-0.9079 z" />',
		viewbox: '0 0 2666 2666'
	}
};

$.ajaxSetup({ async: false });
let strings;
$.getJSON("strings.json", (data) => {
	strings = data;
});

function loc(key, variables) {
    let string = strings[key];
    if (!string) {
        console.error(`string ${key} not found`);
        console.log(strings);
        return key;
    }
    if (variables) {
        if(variables instanceof Array) {
            for (let i = 0; i < variables.length; i++){
                let re = new RegExp(`%${i}(?!\d)`, "g");
                if(!re.exec(string)){
                    console.error(`"%${i}" was not found in the string ${key} to be replace by "${variables[i]}"`);
                    continue;
                }
                string = string.replace(re, variables[i]);
            }
            let re = new RegExp("%\\d+(?!\\d)", 'g');
            const results = string.match(re);
            if(results){
                console.error(`${results} was found in the string, but there is no variables to make the replacement`);
            }
        }
        else{
            console.error('"variables" need be a instance of "Array"');
        }
    }
    return string;
}

const universeData = {
	standard: {
		name: 'Standard',
		code: 'l'
	},
	antimatter: {
		name: 'Antimatter',
		code: 'a'
	},
	evil: {
		name: 'Evil',
		code: 'e'
	},
	heavy: {
		name: 'Heavy',
		code: 'h'
	},
	micro: {
		name: 'Micro',
		code: 'm'
	},
	magic: {
		name: 'Magic',
		code: 'mg'
	}
}

// Achievements/feats from src/achieve.js -> const achieve_list = { ...
const achieve_list = {
    misc: [
        'apocalypse','ascended','dreaded','anarchist','second_evolution','blackhole','warmonger',
        'red_tactics','pacifist','neutralized','paradise','scrooge','madagascar_tree','godwin',
        'laser_shark','infested','mass_starvation','colonist','world_domination','illuminati',
        'syndicate','cult_of_personality','doomed','pandemonium','blood_war','landfill','seeder',
        'miners_dream','shaken','blacken_the_sun','resonance','enlightenment','gladiator','corrupted'
    ],
    species: [
        'mass_extinction','extinct_human','extinct_elven','extinct_orc','extinct_cath','extinct_wolven','extinct_centaur','extinct_kobold',
        'extinct_goblin','extinct_gnome','extinct_ogre','extinct_cyclops','extinct_troll','extinct_tortoisan','extinct_gecko','extinct_slitheryn',
        'extinct_arraak','extinct_pterodacti','extinct_dracnid','extinct_entish','extinct_cacti','extinct_pinguicula','extinct_sporgar',
        'extinct_shroomi','extinct_moldling','extinct_mantis','extinct_scorpid','extinct_antid','extinct_sharkin','extinct_octigoran','extinct_dryad',
        'extinct_satyr','extinct_phoenix','extinct_salamander','extinct_yeti','extinct_wendigo','extinct_tuskin','extinct_kamel','extinct_balorg',
        'extinct_imp','extinct_seraph','extinct_unicorn','extinct_junker','extinct_custom'
    ],
    genus: [
        'creator','genus_humanoid','genus_animal','genus_small','genus_giant','genus_reptilian','genus_avian','genus_insectoid',
        'genus_plant','genus_fungi','genus_aquatic','genus_fey','genus_heat','genus_polar','genus_sand','genus_demonic','genus_angelic'
    ],
    planet: [
        'explorer','biome_grassland','biome_oceanic','biome_forest','biome_desert','biome_volcanic','biome_tundra','biome_hellscape','biome_eden',
        'atmo_toxic','atmo_mellow','atmo_rage','atmo_stormy','atmo_ozone','atmo_magnetic','atmo_trashed','atmo_elliptical','atmo_flare','atmo_dense',
        'atmo_unstable'
    ],
    universe: [
        'vigilante','squished','double_density','cross','macro','marble','heavyweight','whitehole','heavy','canceled',
        'eviltwin','microbang','pw_apocalypse','fullmetal','pass'
    ],
    challenge: ['joyless','steelen','dissipated','technophobe','iron_will','failed_history'],    
};

const achievements = {};
Object.keys(achieve_list).forEach(function(type){
    achieve_list[type].forEach(achieve => achievements[achieve] = {
        name: loc(`achieve_${achieve}_name`),
        desc: loc(`achieve_${achieve}_desc`),
        flair: loc(`achieve_${achieve}_flair`),
        type: type
    });
});
	
const feats = {
    utopia: {
        name: loc("feat_utopia_name"),
        desc: loc("feat_utopia_desc"),
        flair: loc("feat_utopia_flair")
    },
    take_no_advice: {
        name: loc("feat_take_no_advice_name"),
        desc: loc("feat_take_no_advice_desc"),
        flair: loc("feat_take_no_advice_flair")
    },
    ill_advised: {
        name: loc("feat_ill_advised_name"),
        desc: loc("feat_ill_advised_desc"),
        flair: loc("feat_ill_advised_flair")
    },
    organ_harvester: {
        name: loc("feat_organ_harvester_name"),
        desc: loc("feat_organ_harvester_desc"),
        flair: loc("feat_organ_harvester_flair")
    },
    the_misery: {
        name: loc("feat_the_misery_name"),
        desc: loc("feat_the_misery_desc"),
        flair: loc("feat_the_misery_flair")
    },
    energetic: {
        name: loc("feat_energetic_name"),
        desc: loc("feat_energetic_desc"),
        flair: loc("feat_energetic_flair")
    },
    garbage_pie: {
        name: loc("feat_garbage_pie_name"),
        desc: loc("feat_garbage_pie_desc"),
        flair: loc("feat_garbage_pie_flair")
    },
    finish_line: {
        name: loc("feat_finish_line_name"),
        desc: loc("feat_finish_line_desc"),
        flair: loc("feat_finish_line_flair")
    },
    blank_slate: {
        name: loc("feat_blank_slate_name"),
        desc: loc("feat_blank_slate_desc"),
        flair: loc("feat_blank_slate_flair")
    },
    supermassive: {
        name: loc("feat_supermassive_name"),
        desc: loc("feat_supermassive_desc"),
        flair: loc("feat_supermassive_flair")
    },
    steelem: {
        name: loc("feat_steelem_name"),
        desc: loc("feat_steelem_desc"),
        flair: loc("feat_steelem_flair")
    },
    rocky_road: {
        name: loc("feat_rocky_road_name"),
        desc: loc("feat_rocky_road_desc"),
        flair: loc("feat_rocky_road_flair")
    },
    demon_slayer: {
        name: loc("feat_demon_slayer_name"),
        desc: loc("feat_demon_slayer_desc"),
        flair: loc("feat_demon_slayer_flair")
    },
    equilibrium: {
        name: loc("feat_equilibrium_name"),
        desc: loc("feat_equilibrium_desc"),
        flair: loc("feat_equilibrium_flair")
    },
    novice: {
        name: loc("feat_novice_name"),
        desc: loc("feat_achievement_hunter_desc",[10]),
        flair: loc("feat_novice_flair")
    },
    journeyman: {
        name: loc("feat_journeyman_name"),
        desc: loc("feat_achievement_hunter_desc",[25]),
        flair: loc("feat_journeyman_flair")
    },
    adept: {
        name: loc("feat_adept_name"),
        desc: loc("feat_achievement_hunter_desc",[50]),
        flair: loc("feat_adept_flair")
    },
    master: {
        name: loc("feat_master_name"),
        desc: loc("feat_achievement_hunter_desc",[75]),
        flair: loc("feat_master_flair")
    },
    grandmaster: {
        name: loc("feat_grandmaster_name"),
        desc: loc("feat_achievement_hunter_desc",[100]),
        flair: loc("feat_grandmaster_flair")
    },
    nephilim: {
        name: loc("feat_nephilim_name"),
        desc: loc("feat_nephilim_desc"),
        flair: loc("feat_nephilim_flair")
    },
    twisted: {
        name: loc("feat_twisted_name"),
        desc: loc("feat_twisted_desc"),
        flair: loc("feat_twisted_flair")
    },
    friday: {
        name: loc("feat_friday_name"),
        desc: loc("feat_friday_desc"),
        flair: loc("feat_friday_flair")
    },
    valentine: {
        name: loc("feat_love_name"),
        desc: loc("feat_love_desc"),
        flair: loc("feat_love_flair")
    },
    leprechaun: {
        name: loc("feat_leprechaun_name"),
        desc: loc("feat_leprechaun_desc"),
        flair: loc("feat_leprechaun_flair")
    },
    easter: {
        name: loc("feat_easter_name"),
        desc: loc("feat_easter_desc"),
        flair: loc("feat_easter_flair")
    },
    egghunt: {
        name: loc("feat_egghunt_name"),
        desc: loc("feat_egghunt_desc"),
        flair: loc("feat_egghunt_flair")
    },
    halloween: {
        name: loc("feat_boo_name"),
        desc: loc("feat_boo_desc"),
        flair: loc("feat_boo_flair")
    },
    trickortreat: {
        name: loc("feat_trickortreat_name"),
        desc: loc("feat_trickortreat_desc"),
        flair: loc("feat_trickortreat_flair")
    },
    thanksgiving: {
        name: loc("feat_gobble_gobble_name"),
        desc: loc("feat_gobble_gobble_desc"),
        flair: loc("feat_gobble_gobble_flair")
    },
    xmas: {
        name: loc("feat_xmas_name"),
        desc: loc("feat_xmas_desc"),
        flair: loc("feat_xmas_flair")
    },
    fool: {
        name: loc("feat_fool_name"),
        desc: loc("feat_fool_desc"),
        flair: loc("feat_fool_flair")
    }
}

const perks = [
	[ 'mass_extinction', 'achievements' ],
	[ 'extinct_junker', 'achievements' ],
	[ 'anarchist', 'achievements' ],
	[ 'explorer', 'achievements' ],
	[ 'joyless', 'achievements' ],
	[ 'steelen', 'achievements' ],
	[ 'miners_dream', 'achievements' ],
	[ 'creator', 'achievements' ],
	[ 'whitehole', 'achievements' ],
	[ 'blackhole', 'achievements' ],
	[ 'dissipated', 'achievements' ],
	[ 'iron_will', 'achievements' ],
	[ 'failed_history', 'achievements' ],
	[ 'heavyweight', 'achievements' ],
	[ 'technophobe', 'achievements' ],
	[ 'ascended', 'achievements' ],
	[ 'novice', 'feats' ],
	[ 'journeyman', 'feats' ],
];

// CRISPR upgrades from src/arpa.js -> const genePool = {
const upgrades = {
    genetic_memory: {
        id: 'genes-genetic_memory',
        title: loc('arpa_genepool_genetic_memory_title'),
        desc: loc('arpa_genepool_genetic_memory_desc'),
        reqs: {},
        grant: ['creep',1],
        cost: 25,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('genetic_memory')){
                return true;
            }
            return false;
        }
    },
    animus: {
        id: 'genes-animus',
        title: loc('arpa_genepool_animus_title'),
        desc: loc('arpa_genepool_animus_desc'),
        reqs: { creep: 1 },
        grant: ['creep',2],
        cost: 75,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('animus')){
                return true;
            }
            return false;
        }
    },
    divine_remembrance: {
        id: 'genes-divine_remembrance',
        title: loc('arpa_genepool_divine_remembrance_title'),
        desc: loc('arpa_genepool_divine_remembrance_desc'),
        reqs: { creep: 2 },
        grant: ['creep',3],
        cost: 225,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('divine_remembrance')){
                return true;
            }
            return false;
        }
    },
    divine_proportion: {
        id: 'genes-divine_proportion',
        title: loc('arpa_genepool_divine_proportion_title'),
        desc: loc('arpa_genepool_divine_proportion_desc'),
        reqs: { creep: 3 },
        grant: ['creep',4],
        cost: 618,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('divine_proportion')){
                return true;
            }
            return false;
        }
    },
    genetic_repository: {
        id: 'genes-genetic_repository',
        title: loc('arpa_genepool_genetic_repository_title'),
        desc: loc('arpa_genepool_genetic_repository_desc'),
        reqs: { creep: 4 },
        grant: ['creep',5],
        cost: 999,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('genetic_repository')){
                return true;
            }
            return false;
        }
    },
    spatial_reasoning: {
        id: 'genes-spatial_reasoning',
        title: loc('arpa_genepool_spatial_reasoning_title'),
        desc: loc('arpa_genepool_spatial_reasoning_desc'),
        reqs: {},
        grant: ['store',1],
        cost: 50,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('spatial_reasoning')){
                return true;
            }
            return false;
        }
    },
    spatial_superiority: {
        id: 'genes-spatial_superiority',
        title: loc('arpa_genepool_spatial_superiority_title'),
        desc: loc('arpa_genepool_spatial_superiority_desc'),
        reqs: { store: 1 },
        grant: ['store',2],
        cost: 125,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('spatial_superiority')){
                return true;
            }
            return false;
        }
    },
    spatial_supremacy: {
        id: 'genes-spatial_supremacy',
        title: loc('arpa_genepool_spatial_supremacy_title'),
        desc: loc('arpa_genepool_spatial_supremacy_desc'),
        reqs: { store: 2 },
        grant: ['store',3],
        cost: 325,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('spatial_supremacy')){
                return true;
            }
            return false;
        }
    },
    dimensional_warping: {
        id: 'genes-dimensional_warping',
        title: loc('arpa_genepool_dimensional_warping_title'),
        desc: loc('arpa_genepool_dimensional_warping_desc'),
        reqs: { store: 3 },
        grant: ['store',4],
        cost: 500,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('dimensional_warping')){
                return true;
            }
            return false;
        }
    },
    enhanced_muscle_fiber: {
        id: 'genes-enhanced_muscle_fiber',
        title: loc('arpa_genepool_enhanced_muscle_fiber_title'),
        desc: loc('arpa_genepool_enhanced_muscle_fiber_desc'),
        reqs: {},
        grant: ['enhance',1],
        cost: 25,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('enhanced_muscle_fiber')){
                return true;
            }
            return false;
        }
    },
    morphogenesis: {
        id: 'genes-morphogenesis',
        title: loc('arpa_genepool_morphogenesis_title'),
        desc: loc('arpa_genepool_morphogenesis_desc'),
        reqs: {},
        grant: ['evolve',1],
        cost: 10,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('morphogenesis')){
                return true;
            }
            return false;
        }
    },
    recombination: {
        id: 'genes-recombination',
        title: loc('arpa_genepool_recombination_title'),
        desc: loc('arpa_genepool_recombination_desc'),
        reqs: { evolve: 1 },
        grant: ['evolve',2],
        cost: 35,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('recombination')){
                return true;
            }
            return false;
        }
    },
    homologous_recombination: {
        id: 'genes-homologous_recombination',
        title: loc('arpa_genepool_homologous_recombination_title'),
        desc: loc('arpa_genepool_homologous_recombination_desc'),
        reqs: { evolve: 2 },
        grant: ['evolve',3],
        cost: 70,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('homologous_recombination')){
                return true;
            }
            return false;
        }
    },
    genetic_reshuffling: {
        id: 'genes-genetic_reshuffling',
        title: loc('arpa_genepool_genetic_reshuffling_title'),
        desc: loc('arpa_genepool_genetic_reshuffling_desc'),
        reqs: { evolve: 3 },
        grant: ['evolve',4],
        cost: 175,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('genetic_reshuffling')){
                return true;
            }
            return false;
        }
    },
    recombinant_dna: {
        id: 'genes-recombinant_dna',
        title: loc('arpa_genepool_recombinant_dna_title'),
        desc: loc('arpa_genepool_recombinant_dna_desc'),
        reqs: { evolve: 4 },
        grant: ['evolve',5],
        cost: 440,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('recombinant_dna')){
                return true;
            }
            return false;
        }
    },
    chimeric_dna: {
        id: 'genes-chimeric_dna',
        title: loc('arpa_genepool_chimeric_dna_title'),
        desc: loc('arpa_genepool_chimeric_dna_desc'),
        reqs: { evolve: 5 },
        grant: ['evolve',6],
        cost: 1100,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('chimeric_dna')){
                return true;
            }
            return false;
        }
    },
    molecular_cloning: {
        id: 'genes-molecular_cloning',
        title: loc('arpa_genepool_molecular_cloning_title'),
        desc: loc('arpa_genepool_molecular_cloning_desc'),
        reqs: { evolve: 6 },
        grant: ['evolve',7],
        cost: 2750,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('molecular_cloning')){
                return true;
            }
            return false;
        }
    },
    transgenes: {
        id: 'genes-transgenes',
        title: loc('arpa_genepool_transgenes_title'),
        desc: loc('arpa_genepool_transgenes_desc'),
        reqs: { evolve: 7 },
        grant: ['evolve',8],
        cost: 6875,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('transgenes')){
                return true;
            }
            return false;
        }
    },
    synthesis: {
        id: 'genes-synthesis',
        title: loc('arpa_genepool_synthesis_title'),
        desc: loc('arpa_genepool_synthesis_desc',[2,10]),
        reqs: { evolve: 1 },
        grant: ['synthesis',1],
        cost: 25,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('synthesis')){
                return true;
            }
            return false;
        }
    },
    karyokinesis: {
        id: 'genes-karyokinesis',
        title: loc('arpa_genepool_karyokinesis_title'),
        desc: loc('arpa_genepool_synthesis_desc',[3,25]),
        reqs: { synthesis: 1 },
        grant: ['synthesis',2],
        cost: 40,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('karyokinesis')){
                return true;
            }
            return false;
        }
    },
    cytokinesis: {
        id: 'genes-cytokinesis',
        title: loc('arpa_genepool_cytokinesis_title'),
        desc: loc('arpa_genepool_synthesis_desc',[4,50]),
        reqs: { synthesis: 2 },
        grant: ['synthesis',3],
        cost: 55,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('cytokinesis')){
                return true;
            }
            return false;
        }
    },
    mitosis: {
        id: 'genes-mitosis',
        title: loc('arpa_genepool_mitosis_title'),
        desc: loc('arpa_genepool_mitosis_desc',[3]),
        reqs: { synthesis: 3, evolve: 2 },
        grant: ['plasma',1],
        cost: 90,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('mitosis')){
                return true;
            }
            return false;
        }
    },
    metaphase: {
        id: 'genes-metaphase',
        title: loc('arpa_genepool_metaphase_title'),
        desc: loc('arpa_genepool_mitosis_desc',[5]),
        reqs: { plasma: 1 },
        grant: ['plasma',2],
        cost: 165,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('mitosis')){
                return true;
            }
            return false;
        }
    },
    mutation: {
        id: 'genes-mutation',
        title: loc('arpa_genepool_mutation_title'),
        desc: loc('arpa_genepool_mutation_desc'),
        reqs: { synthesis: 3, creep: 5 },
        grant: ['mutation',1],
        cost: 1250,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('mutation')){
                global.genes['mutation'] = 1;
                genetics();
                return true;
            }
            return false;
        }
    },
    transformation: {
        id: 'genes-transformation',
        title: loc('arpa_genepool_transformation_title'),
        desc: loc('arpa_genepool_transformation_desc'),
        reqs: { mutation: 1 },
        grant: ['mutation',2],
        cost: 1500,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('transformation')){
                global.genes['mutation'] = 2;
                genetics();
                return true;
            }
            return false;
        }
    },
    metamorphosis: {
        id: 'genes-metamorphosis',
        title: loc('arpa_genepool_metamorphosis_title'),
        desc: loc('arpa_genepool_metamorphosis_desc'),
        reqs: { mutation: 2 },
        grant: ['mutation',3],
        cost: 1750,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('metamorphosis')){
                global.genes['mutation'] = 3;
                genetics();
                return true;
            }
            return false;
        }
    },
    replication: {
        id: 'genes-replication',
        title: loc('arpa_genepool_replication_title'),
        desc: loc('arpa_genepool_replication_desc'),
        reqs: { evolve: 1 },
        grant: ['birth',1],
        cost: 65,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('replication')){
                return true;
            }
            return false;
        }
    },
    artificer: {
        id: 'genes-artificer',
        title: loc('arpa_genepool_artificer_title'),
        desc: loc('arpa_genepool_artificer_desc'),
        reqs: { evolve: 1 },
        grant: ['crafty',1],
        cost: 45,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('artificer')){
                return true;
            }
            return false;
        }
    },
    detail_oriented: {
        id: 'genes-detail_oriented',
        title: loc('arpa_genepool_detail_oriented_title'),
        desc: loc('arpa_genepool_crafting_desc',['50']),
        reqs: { crafty: 1 },
        grant: ['crafty',2],
        cost: 90,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('detail_oriented')){
                return true;
            }
            return false;
        }
    },
    rigorous: {
        id: 'genes-rigorous',
        title: loc('arpa_genepool_rigorous_title'),
        desc: loc('arpa_genepool_crafting_desc',['100']),
        reqs: { crafty: 2 },
        grant: ['crafty',3],
        cost: 135,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('rigorous')){
                return true;
            }
            return false;
        }
    },
    geographer: {
        id: 'genes-geographer',
        title: loc('arpa_genepool_geographer_title'),
        desc: loc('arpa_genepool_geographer_desc'),
        reqs: { store: 1 },
        grant: ['queue',1],
        cost: 75,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('geographer')){
                return true;
            }
            return false;
        }
    },
    architect: {
        id: 'genes-architect',
        title: loc('arpa_genepool_architect_title'),
        desc: loc('arpa_genepool_architect_desc'),
        reqs: { queue: 1 },
        grant: ['queue',2],
        cost: 160,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('architect')){
                return true;
            }
            return false;
        }
    },
    hardened_genes: {
        id: 'genes-hardened_genes',
        title: loc('arpa_genepool_hardened_genes_title'),
        desc: loc('arpa_genepool_hardened_genes_desc'),
        reqs: {},
        grant: ['challenge',1],
        cost: 5,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('hardened_genes')){
                return true;
            }
            return false;
        }
    },
    unlocked: {
        id: 'genes-unlocked',
        title: loc('arpa_genepool_unlocked_title'),
        desc: loc('arpa_genepool_unlocked_desc'),
        reqs: {challenge:1},
        grant: ['challenge',2],
        cost: 50,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('unlocked')){
                return true;
            }
            return false;
        }
    },
    universal: {
        id: 'genes-universal',
        title: loc('arpa_genepool_universal_title'),
        desc: loc('arpa_genepool_universal_desc'),
        reqs: {challenge:2},
        grant: ['challenge',3],
        condition(){
            return global.race.universe !== 'standard' ? true : false;
        },
        cost: 400,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('universal')){
                return true;
            }
            return false;
        }
    },
    standard: {
        id: 'genes-standard',
        title: loc('arpa_genepool_standard_title'),
        desc: loc('arpa_genepool_standard_desc'),
        reqs: {challenge:3},
        grant: ['challenge',4],
        condition(){
            return global.race.universe !== 'standard' ? true : false;
        },
        cost: 2500,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('standard')){
                return true;
            }
            return false;
        }
    },
    mastered: {
        id: 'genes-mastered',
        title: loc('arpa_genepool_mastered_title'),
        desc: loc('arpa_genepool_mastered_desc'),
        reqs: {challenge:4},
        grant: ['challenge',5],
        cost: 4000,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('mastered')){
                return true;
            }
            return false;
        }
    },
    negotiator: {
        id: 'genes-negotiator',
        title: loc('arpa_genepool_negotiator_title'),
        desc: loc('arpa_genepool_negotiator_desc'),
        reqs: {challenge:2},
        grant: ['trader',1],
        cost: 750,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('negotiator')){
                global.genes['trader'] = 1;
                updateTrades();
                return true;
            }
            return false;
        }
    },
    ancients: {
        id: 'genes-ancients',
        title: loc('arpa_genepool_ancients_title'),
        desc: loc('arpa_genepool_ancients_desc'),
        reqs: { evolve: 2, old_gods: 1 },
        grant: ['ancients',1],
        cost: 120,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('ancients')){
                global.genes['ancients'] = 1;
                drawTech();
                return true;
            }
            return false;
        }
    },
    faith: {
        id: 'genes-faith',
        title: loc('arpa_genepool_faith_title'),
        desc: loc('arpa_genepool_faith_desc'),
        reqs: { ancients: 1 },
        grant: ['ancients',2],
        cost: 300,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('faith')){
                global.civic.priest.display = true;
                return true;
            }
            return false;
        }
    },
    devotion: {
        id: 'genes-devotion',
        title: loc('arpa_genepool_devotion_title'),
        desc: loc('arpa_genepool_devotion_desc'),
        reqs: { ancients: 2 },
        grant: ['ancients',3],
        cost: 600,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('devotion')){
                return true;
            }
            return false;
        }
    },
    acolyte: {
        id: 'genes-acolyte',
        title: loc('arpa_genepool_acolyte_title'),
        desc: loc('arpa_genepool_acolyte_desc'),
        reqs: { ancients: 3 },
        grant: ['ancients',4],
        cost: 1000,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('acolyte')){
                return true;
            }
            return false;
        }
    },
    conviction: {
        id: 'genes-conviction',
        title: loc('arpa_genepool_conviction_title'),
        desc: loc('arpa_genepool_conviction_desc'),
        reqs: { ancients: 4 },
        grant: ['ancients',5],
        cost: 1500,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('conviction')){
                return true;
            }
            return false;
        }
    },
    transcendence: {
        id: 'genes-transcendence',
        title: loc('arpa_genepool_transcendence_title'),
        desc: loc('arpa_genepool_transcendence_desc'),
        reqs: { ancients: 1, mutation: 3 },
        grant: ['transcendence',1],
        cost: 3000,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('transcendence')){
                global.genes['transcendence'] = 1;
                drawTech();
                return true;
            }
            return false;
        }
    },
    /*preeminence: {
        id: 'genes-preeminence',
        title: loc('arpa_genepool_preeminence_title'),
        desc: loc('arpa_genepool_preeminence_desc'),
        reqs: {transcendence: 1, challenge:3},
        grant: ['transcendence',2],
        cost: 4200,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('preeminence')){
                return true;
            }
            return false;
        }
    },*/
    bleeding_effect: {
        id: 'genes-bleeding_effect',
        title: loc('arpa_genepool_bleeding_effect_title'),
        desc: loc('arpa_genepool_bleeding_effect_desc',[2.5]),
        reqs: { creep: 2 },
        grant: ['bleed',1],
        condition(){
            return global.race.universe === 'antimatter' ? true : false;
        },
        cost: 100,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('bleeding_effect')){
                return true;
            }
            return false;
        }
    },
    synchronicity: {
        id: 'genes-synchronicity',
        title: loc('arpa_genepool_synchronicity_title'),
        desc: loc('arpa_genepool_synchronicity_desc',[25]),
        reqs: { bleed: 1 },
        grant: ['bleed',2],
        cost: 500,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('synchronicity')){
                return true;
            }
            return false;
        }
    },
    astral_awareness: {
        id: 'genes-astral_awareness',
        title: loc('arpa_genepool_astral_awareness_title'),
        desc: loc('arpa_genepool_astral_awareness_desc'),
        reqs: { bleed: 2 },
        grant: ['bleed',3],
        cost: 1000,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('astral_awareness')){
                return true;
            }
            return false;
        }
    },
}

const upgradeList = [];
let i;
let blackholeDesc = mass_extinctionDesc = creatorDesc = explorerDesc = whitehole2Desc = '';
let heavyweightDesc = dissipated3Desc = dissipated4Desc = anarchistDesc = steelenDesc = '';
let novice1Desc = novice2Desc = journeyman1Desc = journeyman2Desc = minersDesc = joylessDesc = '';
let technoDesc5 = '';
for (i = 1; i <= 5; i++) {
	blackholeDesc += i * 5;
	if (i < 5) blackholeDesc += '% / ';
	mass_extinctionDesc += (i - 1) * 50;
	if (i < 5) mass_extinctionDesc += '% / ';
	creatorDesc += ((i+2)/2);
	if (i < 5) creatorDesc += 'x / ';
	joylessDesc += i * 2;
	if (i < 5) joylessDesc += '% / +';
	explorerDesc += '+' + i;
	if (i < 5) explorerDesc += ' / ';
	steelenDesc += i * 2;
	if (i < 5) steelenDesc += '% / ';
	whitehole2Desc += (i * 5);
	if (i < 5) whitehole2Desc += '% / ';
	heavyweightDesc += (i * 4);
	if (i < 5) heavyweightDesc += '% / ';
	anarchistDesc += '-' + (i * 10);
	if (i < 5) anarchistDesc += '% / ';
	novice1Desc += (i / 2);
	if (i < 5) novice1Desc += 'x / +';
	novice2Desc += (i / 4);
	if (i < 5) novice2Desc += 'x / +';
	journeyman1Desc += Math.floor((i / 2) + 0.5);
	if (i < 5) journeyman1Desc += ' / +';
	journeyman2Desc += Math.floor(i / 2);
	if (i < 5) journeyman2Desc += ' / +';
	minersDesc += i + (i == 5 ? 2 : (i == 4 ? 1 : 0));
	if (i < 5) minersDesc += ' / ';
	technoDesc5 += i;
	if (i < 5) technoDesc5 += ' / +';
}
//let dissipated2Desc = `1kW (${star2}) / +2kw (${star4})`;
let dissipated2Desc = `1kW (2-star) / +2 (4-star)`;

const filters = {
	vigilante: { only: 'evil' },
	blood_war: { not: 'evil' },
	extinct_seraph: { only: 'evil' },
	extinct_unicorn: { only: 'evil' },
	extinct_balorg: { not: 'evil' },
	extinct_imp: { not: 'evil' },
	genus_angelic: { only: 'evil' },
	genus_demonic: { not: 'evil' },
	biome_eden: { only: 'evil' },
	biome_hellscape: { not: 'evil' },
	squished: { only: 'micro' },
	macro: { only: 'micro' },
	marble: { only: 'micro' },
	heavyweight: { only: 'heavy' },
	cross: { only: 'antimatter' },
	heavy: { only: 'heavy' },
	canceled: { only: 'antimatter' },
	eviltwin: { only: 'evil' },
	microbang: { only: 'micro' },
	whitehole: { only: 'standard' },
    double_density: { only: 'heavy' }
}

const perksDesc = {
	blackhole: loc("achieve_perks_blackhole",[blackholeDesc]),
	mass_extinction: [
		loc("achieve_perks_mass_extinction"),
		loc("achieve_perks_mass_extinction2",[mass_extinctionDesc]),
	],
	creator: loc("achieve_perks_creator",[creatorDesc]),
	miners_dream: loc("achieve_perks_miners_dream",[minersDesc]),
	explorer: loc("achieve_perks_explorer",[explorerDesc]),
	joyless: loc("achieve_perks_joyless",[joylessDesc]),
	steelen: loc("achieve_perks_steelen",[steelenDesc]),
	extinct_junker: loc("achieve_perks_enlightened"),
	whitehole: [
		loc("achieve_perks_whitehole"),
		loc("achieve_perks_whitehole2",[whitehole2Desc])
	],
	heavyweight: loc("achieve_perks_heavyweight",[heavyweightDesc]),
	dissipated: [
		loc("achieve_perks_dissipated1",[1]),
		loc("achieve_perks_dissipated2",[dissipated2Desc]),
		loc("achieve_perks_dissipated3",[1]),
		loc("achieve_perks_dissipated4",[1])
	],
    iron_will: [
		loc("achieve_perks_iron_will1",[0.15]),
		loc("achieve_perks_iron_will2",[10]),
		loc("achieve_perks_iron_will3",[6]),
		loc("achieve_perks_iron_will4",[1]),
		loc("achieve_perks_iron_will5")
    ],
	failed_history: loc("achieve_perks_failed_history",[1]),
	anarchist: loc("achieve_perks_anarchist",[anarchistDesc]),
	technophobe: [
		'0 Star: '+loc("achieve_perks_technophobe1",[25]),
		'1 Star: '+loc("achieve_perks_technophobe2",[10]),
		'2 Star: '+loc("achieve_perks_technophobe3a",['bonus'])+' (1 per universe completion)',
		'3 Star: Additional '+loc("achieve_perks_technophobe2",[15]),
		'4 Star: +5% Thermal Collector Efficiency per 3-star achievement in non-standard universes',
		'4 Star: '+loc("achieve_perks_technophobe4",[10]),
		loc("achieve_perks_technophobe5",[technoDesc5]).substring(loc("achieve_perks_technophobe5",[technoDesc5]).length-1, 1)+' per star level'
	],
    ascended: [
        '+1 gene during custom species creation per star level per universe (max of +5 genes per universe). This perk is not currently listed on the stats page in-game.'
    ],
	novice: loc("achieve_perks_novice",[novice1Desc, novice2Desc]),
	journeyman: [
		loc("achieve_perks_journeyman2",[journeyman1Desc, journeyman2Desc]),
	]
}

const keywords = {
	apocalypse: ['reset'],
	ascended: ['reset'],
	technophobe: ['reset', 'challenge', 'perk'],
	dreaded: ['reset'],
	anarchist: ['reset', 'perk'],
	squished: ['reset', 'universe'],
	second_evolution: ['reset', 'fanaticism'],
	blackhole: ['progression', 'perk'],
	warmonger: ['combat'],
	red_tactics: ['combat'],
	pacifist: ['combat', 'unification'],
	neutralized: ['combat'],
	paradise: ['other'],
	scrooge: ['other'],
	madagascar_tree: ['fanaticism'],
	godwin: ['fanaticism'],
	laser_shark: ['other'],
	infested: ['fanaticism'],
	mass_starvation: ['other'],
	colonist: ['progression'],
	world_domination: ['unification'],
	illuminati: ['unification'],
	syndicate: ['unification'],
	cult_of_personality: ['unification'],
	double_density: ['universe'],
	doomed: ['progression'],
	pandemonium: ['progression'],
	blood_war: ['progression'],
	cross: ['universe'],
	landfill: ['other'],
	seeder: ['reset'],
	macro: ['universe'],
	marble: ['universe'],
	explorer: ['biome', 'reset', 'perk'],
	joyless: ['progression', 'challenge'],
	steelen: ['challenge', 'reset', 'perk'],
	biome_grassland: ['biome'],
	biome_oceanic: ['biome'],
	biome_forest: ['biome'],
	biome_desert: ['biome'],
	biome_volcanic: ['biome'],
	biome_tundra: ['biome'],
	biome_hellscape: ['biome'],
	biome_eden: ['biome', 'universe'],
	creator: ['reset', 'perk'],
	heavyweight: ['reset', 'universe', 'perk'],
	miners_dream: ['reset', 'perk'],
	whitehole: ['reset', 'perk', 'universe'],
	heavy: ['reset', 'universe'],
	canceled: ['reset', 'universe'],
	eviltwin: ['reset', 'universe'],
	microbang: ['reset', 'universe'],
	dissipated: ['reset', 'challenge', 'perk'],
	shaken: ['scenario'],
	iron_will: ['perk', 'scenario'],
	failed_history: ['perk', 'scenario'],
	blacken_the_sun: ['other'],
	genus_humanoid: ['genus'],
	genus_animal: ['genus'],
	genus_small: ['genus'],
	genus_giant: ['genus'],
	genus_reptilian: ['genus'],
	genus_avian: ['genus'],
	genus_insectoid: ['genus'],
	genus_plant: ['genus'],
	genus_fungi: ['genus'],
	genus_aquatic: ['genus'],
	genus_fey: ['genus'],
	genus_heat: ['genus'],
	genus_polar: ['genus'],
	genus_sand: ['genus'],
	genus_demonic: ['genus'],
	genus_angelic: ['genus', 'universe'],
	atmo_toxic: ['atmosphere'],
	atmo_mellow: ['atmosphere'],
	atmo_rage: ['atmosphere'],
	atmo_stormy: ['atmosphere'],
	atmo_ozone: ['atmosphere'],
	atmo_magnetic: ['atmosphere'],
	atmo_trashed: ['atmosphere'],
	atmo_elliptical: ['atmosphere'],
	atmo_flare: ['atmosphere'],
	atmo_dense: ['atmosphere'],
	atmo_unstable: ['atmosphere'],
	mass_extinction: ['reset', 'perk'],
	vigilante: ['reset', 'universe'],
	extinct_human: ['species'],
	extinct_elven: ['species'],
	extinct_orc: ['species'],
	extinct_cath: ['species'],
	extinct_wolven: ['species'],
	extinct_centaur: ['species'],
	extinct_kobold: ['species'],
	extinct_goblin: ['species'],
	extinct_gnome: ['species'],
	extinct_ogre: ['species'],
	extinct_cyclops: ['species'],
	extinct_troll: ['species'],
	extinct_tortoisan: ['species'],
	extinct_gecko: ['species'],
	extinct_slitheryn: ['species'],
	extinct_arraak: ['species'],
	extinct_pterodacti: ['species'],
	extinct_dracnid: ['species'],
	extinct_entish: ['species'],
	extinct_cacti: ['species'],
	extinct_pinguicula: ['species'],
	extinct_sporgar: ['species'],
	extinct_shroomi: ['species'],
	extinct_moldling: ['species'],
	extinct_mantis: ['species'],
	extinct_scorpid: ['species'],
	extinct_antid: ['species'],
	extinct_sharkin: ['species'],
	extinct_octigoran: ['species'],
	extinct_dryad: ['species'],
	extinct_satyr: ['species'],
	extinct_phoenix: ['species'],
	extinct_salamander: ['species'],
	extinct_yeti: ['species'],
	extinct_wendigo: ['species'],
	extinct_tuskin: ['species'],
	extinct_kamel: ['species'],
	extinct_balorg: ['species'],
	extinct_imp: ['species'],
	extinct_seraph: ['species', 'universe'],
	extinct_unicorn: ['species', 'universe'],
	extinct_junker: ['species', 'perk', 'scenario'],
	extinct_custom: ['species'],
}

function createIcon(div, universe, type, item) {
	if (!type) {
		let name = div.parent().data('index');
		let icon = '<svg class="svg star0 '+universe+'" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="'+icons[universe].viewbox+'" xml:space="preserve" data-level="0">'+icons[universe].path+'</svg>';
		let blank = false;
		if (universe != 'standard') {
			if (filters[name] && filters[name]['only'] && filters[name]['only'] != universe) blank = true;
			if (filters[name] && filters[name]['not'] && filters[name]['not'] == universe) blank = true;
		}

		if (blank == true) {
			icon = '<svg class="svg" width="16px" height="16px"></svg>';
			div.append(icon);
		}
		else {
			div.append(icon).children().last().tooltip({ placement: 'right', html: true, 'title': '<b>'+(universe == 'standard' ? 'Overall' : universeData[universe].name+' Universe')+'</b><hr class="hr-tip" />Achievement Not Awarded' });
			div.parent().addClass(universe).addClass(universe+'Unearned');
			if (universe == 'standard') div.parent().addClass(universe).addClass('Unearned');
		}
	}
	else {
		let icon;
		switch(type) {
			case 'achievement':
				let uniName = universeData[universe].name;
				let abbrev = universeData[universe].code;
				let level = item[abbrev];
				icon = '<svg class="svg star'+level+' '+universe+'" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="'+icons[universe].viewbox+'" xml:space="preserve" data-level="'+level+'">'+icons[universe].path+'</svg>';
				div.append(icon).children().last().tooltip({ placement: 'right', html: true, 'title': '<b>'+uniName+' Universe</b><hr class="hr-tip" />'+(level - 1)+' Challenges Completed' });
				div.parent().addClass(universe).addClass(universe+(level-1)+'-star')
				break;
			case 'upgrade':
				icon = $('<svg class="checkmark" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="'+icons[universe].viewbox+'" xml:space="preserve">'+icons[universe].path+'</svg>');
				div.append(icon).children().last().tooltip({ placement: 'right', 'title': 'Upgrade Purchased' });
				break;
			default:
				icon = $('<svg class="star'+item+'" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="'+icons[universe].viewbox+'" xml:space="preserve">'+icons[universe].path+'</svg>');
				div.append(icon).children().last().tooltip({ placement: 'right', 'title': (item - 1)+' Challenges Completed' });
		}
	}
}

$.each(achievements, function(index, achievement){
	let aKeywords = '';
	$.each(keywords[index], function(index, value) {
		aKeywords += ' '+value;
	});
	let html = '<div class="row'+aKeywords+'" data-index="'+index+'"><div id="a-'+index+'" class="col-icon"></div><div>'+achievement.name+'</div></div>';
	$('#achievementList>div').append(html);
	$('#a-'+index).siblings().first().tooltip({ placement: 'right', 'title': achievement.desc+'<hr class="hr-tip"><span class="small">'+achievement.flair+'</span>', html: true });
});
$.each(feats, function(index, feat){
	let html = '<div class="row"><div id="f-'+index+'" class="col-upgrade"></div><div>'+feat.name+'</div></div>';
	$('#featList>div').append(html);
	$('#f-'+index).siblings().first().tooltip({ placement: 'right', 'title': feat.desc+'<hr class="hr-tip"><span class="small">'+feat.flair+'</span>', html: true });
});
$.each(perks, function(index, details){
	let perkName = details[0];
	let perk = (details[1] == 'achievements') ? achievements[perkName] : feats[perkName];
	let html = '<div class="row"><div id="p-'+perkName+'" class="col-upgrade"></div><div>'+perk.name+'</div></div>';
	$('#perkList>div').append(html);
	let perkBonus = '';
	if (Array.isArray(perksDesc[perkName])) {
		$.each(perksDesc[perkName], function(index, desc){
			perkBonus += desc+'<br />';
		});
	}
	else perkBonus = perksDesc[perkName];
	$('#p-'+perkName).siblings().first().tooltip({ placement: 'right', 'title': perk.desc+'<hr class="hr-tip"><span class="small">'+perk.flair+'</span><hr class="hr-tip"><div class="small text-left">'+perkBonus+'</div>', html: true });
});
$.each(upgrades, function(index, upgrade){
	upgradeList.push(index);
	let html = '<div class="row"><div id="g-'+index+'" class="col-upgrade"></div><div>'+upgrade.title+' <span class="small">('+upgrade.grant[0]+' '+upgrade.grant[1]+')</span></div></div>';
	$('#crisprList>div').append(html);
	$('#g-'+index).siblings().first().tooltip({ placement: 'right', 'title': upgrade.title+'<hr class="hr-tip">'+upgrade.cost+' '+(index == 'bleeding_effect' ? 'Anti-Plasmids' : 'Plasmids')+'<hr class="hr-tip"><span class="small">'+upgrade.desc+'</span>', html: true });
});

$('#load').on('click', function(){
	clearScreen();

	let importText = $('#saveTextarea').val();
	if (importText != '') {
		let data;
		let featComplete = perkComplete = upgradeComplete = 0;
		try {
			data = JSON.parse(LZString.decompressFromBase64(importText));
			saveData.achievements = data.stats.achieve ? data.stats.achieve : {};
			saveData.feats = data.stats.feat ? data.stats.feat : {};
			saveData.genes = data.genes ? data.genes : {};
		} catch(e) {
			alert('Invalid save data.')
			return false;
		}

		let standardComplete = 0;
		let heavyComplete = 0;
		let microComplete = 0;
		let antiComplete = 0;
		let evilComplete = 0;
		let magicComplete = 0;
		$.each(achievements, function(index, achieve){
			let div = $('#a-'+index);
			if (div.length) {
				let achievement = saveData.achievements[index];
				if (achievement) {
					if (achievement['h']) {
						createIcon(div, 'heavy', 'achievement', achievement);
						heavyComplete++;
					}
					else createIcon(div, 'heavy');
					if (achievement['m']) {
						createIcon(div, 'micro', 'achievement', achievement);
						microComplete++;
					}
					else createIcon(div, 'micro');
					if (achievement['e']) {
						createIcon(div, 'evil', 'achievement', achievement);
						evilComplete++;
					}
					else createIcon(div, 'evil');
					if (achievement['a']) {
						createIcon(div, 'antimatter', 'achievement', achievement);
						antiComplete++;
					}
					else createIcon(div, 'antimatter');
					if (achievement['mg']) {
						createIcon(div, 'magic', 'achievement', achievement);
						magicComplete++;
					}
					else createIcon(div, 'magic');					
					if (achievement['l']) {
						createIcon(div, 'standard', 'achievement', achievement);
						standardComplete++;
					}					
					else createIcon(div, 'standard');

				}
				else {
					createIcon(div, 'heavy');
					createIcon(div, 'micro');
					createIcon(div, 'evil');
					createIcon(div, 'antimatter');
					createIcon(div, 'magic');
					createIcon(div, 'standard');
				}
			}
		});
		let allComplete = standardComplete + heavyComplete + microComplete + evilComplete + antiComplete;

		let standardTotal = $('.svg.standard').length;
		let heavyTotal = $('.svg.heavy').length;
		let microTotal = $('.svg.micro').length;
		let evilTotal = $('.svg.evil').length;
		let antiTotal = $('.svg.antimatter').length;
		let magicTotal = $('.svg.magic').length;
		let allTotal = standardTotal + heavyTotal + microTotal + evilTotal + antiTotal + magicTotal;

		let html = '<span class="'+(allComplete == allTotal ? 'yellow' : '')+'">'+allComplete+'</span> of <span class="yellow">'+allTotal+'</span> Total Achievement Levels<br />'+(allComplete/allTotal*100).toFixed(2)+'% Complete<br /><p class="universe-totals">';
		html += 'Standard Universe: '+standardComplete+' of '+standardTotal+' (<span class="'+(standardComplete == standardTotal ? 'yellow' : '')+'">'+(standardComplete/standardTotal*100).toFixed(2)+'% Complete</span>)<br />';
		html += 'Heavy Universe: '+heavyComplete+' of '+heavyTotal+' (<span class="'+(heavyComplete == heavyTotal ? 'yellow' : '')+'">'+(heavyComplete/heavyTotal*100).toFixed(2)+'% Complete</span>)<br />';
		html += 'Micro Universe: '+microComplete+' of '+microTotal+' (<span class="'+(microComplete == microTotal ? 'yellow' : '')+'">'+(microComplete/microTotal*100).toFixed(2)+'% Complete</span>)<br />';
		html += 'Evil Universe: '+evilComplete+' of '+evilTotal+' (<span class="'+(evilComplete == evilTotal ? 'yellow' : '')+'">'+(evilComplete/evilTotal*100).toFixed(2)+'% Complete</span>)<br />';
		html += 'Antimatter Universe: '+antiComplete+' of '+antiTotal+' (<span class="'+(antiComplete == antiTotal ? 'yellow' : '')+'">'+(antiComplete/antiTotal*100).toFixed(2)+'% Complete</span>)<br />';
		html += 'Magic Universe: '+magicComplete+' of '+magicTotal+' (<span class="'+(magicComplete == magicTotal ? 'yellow' : '')+'">'+(antiComplete/magicTotal*100).toFixed(2)+'% Complete</span>)</p>';
		$('#achievementList>p').html(html);

		$.each(saveData.feats, function(index, feat){
			let div = $('#f-'+index);
			if (div.length) {
				featComplete++;
				(feat > 0) ? createIcon(div, 'standard', 'feat', feat) : createIcon(div, 'standard');
			}
		});
		let fColor = (featComplete == Object.keys(feats).length) ? 'yellow' : '';
		$('#featList>p').html('<span class="'+fColor+'">'+featComplete+'</span> of <span class="yellow">'+Object.keys(feats).length+'</span> ('+(featComplete/Object.keys(feats).length*100).toFixed(2)+'% Complete)');

		$.each(perks, function(index, details){
			let perkName = details[0];
			if (saveData.achievements[perkName] || saveData.feats[perkName]) {
				let perkLevel = (details[1] == 'achievements') ? saveData.achievements[perkName]['l'] : saveData.feats[perkName];
				let div = $('#p-'+perkName);
				if (div.length) {
					perkComplete++;
					(perkLevel > 0) ? createIcon(div, 'standard', 'perk', perkLevel) : createIcon(div, 'standard');
				}
			}
		});
		let pColor = (perkComplete == Object.keys(perks).length) ? 'yellow' : '';
		$('#perkList>p').html('<span class="'+pColor+'">'+perkComplete+'</span> of <span class="yellow">'+Object.keys(perks).length+'</span> ('+(perkComplete/Object.keys(perks).length*100).toFixed(2)+'% Complete)');

		$.each(upgrades, function(type, upgrade){
			$.each(saveData.genes, function(index, level){
				if (upgrade.grant[0] == index && upgrade.grant[1] <= level) {
					let div = $('#g-'+type);
					if (div.length) upgradeComplete++;
					(div.length) ? createIcon(div, 'checkmark', 'upgrade', 0) : createIcon(div, 'checkmark');
				}
			});
		});
		let uColor = (upgradeComplete == Object.keys(upgrades).length) ? 'yellow' : '';
		$('#crisprList>p').html('<span class="'+uColor+'">'+upgradeComplete+'</span> of <span class="yellow">'+Object.keys(upgrades).length+'</span> ('+(upgradeComplete/Object.keys(upgrades).length*100).toFixed(2)+'% Purchased)');

		$('#filterRow').removeClass('d-none');
	}
});

// Isotope setup
var $achieves = $('#achievementList>div').isotope({
  itemSelector: '.row',
  layoutMode: 'vertical'
});

// Store filter for each group
var checks = { 'general': '*', 'universe': '*', 'rating': '*' };
$('#filterRow').on('click', '.btn', function(event){
	var $button = $(event.currentTarget);
	var $buttonGroup = $button.parents('.btn-group');
	$buttonGroup.children().removeClass('active');
	$button.button('toggle');
	var filterGroup = $buttonGroup.attr('data-filter-group');
	var buttonAttr = $button.attr('data-filter');
	switch(filterGroup) {
		case 'universes':
			checks['universe'] = buttonAttr;
			let rating = $('#filterRow').find('.btn-group[data-filter-group="rating"] > .active').data('filter');
			if (checks['rating'] != '*' && buttonAttr != '*') checks['rating'] = buttonAttr+rating;
			else if (rating != '*') checks['rating'] = '.'+rating;
			else checks['rating'] = rating;
			break;
		case 'rating':
			if (checks['universe'] != '*' && buttonAttr != '*') {
				checks['rating'] = checks['universe']+buttonAttr
			}
			else {
				if (buttonAttr != '*') checks['rating'] = '.'+buttonAttr;
				else checks['rating'] = buttonAttr;
			}
			break;
		default:
			checks[filterGroup] = buttonAttr;

	}

	var filterValue = concatValues(checks);
	$achieves.isotope({ filter: filterValue });

	$('.filter-highlight').removeClass('filter-highlight');
	if (checks['universe'] != '*') $('.svg'+checks['universe']).addClass('filter-highlight');
});

// Flatten object by concatenating values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}

function clearScreen(clear = false) {
	$('#achievementList>div>div .col-icon').empty();
	$('#achievementList>p').empty();
	$('#featList>div>div .col-upgrade').empty();
	$('#featList>p').empty();
	$('#perkList>div>div .col-upgrade').empty();
	$('#perkList>p').empty();
	$('#crisprList>div>div .col-upgrade').empty();
	$('#crisprList>p').empty();
	if (clear == true) $('#saveTextarea').val('');
	$('.col-icon svg, .col-upgrade svg').tooltip('dispose');
	$('#allGeneral').click();
	$('#allUniverses').click();
	$('#allRatings').click();
	$('#achievementList div').each(function(){
		$(this).show();
	});

	$.each(achievements, function(index, achievement){
		let row = $('#achievementList div [data-index="'+index+'"]');
		row.removeClass().addClass('row');
		$.each(keywords[index], function(i, value) {
			row.addClass(value);
		});
	});
}


$('#clear').on('click', function(){
	clearScreen(true);
});

});

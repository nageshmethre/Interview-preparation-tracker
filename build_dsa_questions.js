const fs = require('fs');
const path = require('path');

// Global mock for loading existing file
global.window = {};
require('./frontend/assets/js/questions-data.js');
const existingBank = global.window.DSA_QUESTIONS_BANK || [];

console.log('Loaded existing bank with count:', existingBank.length);

// Helper to generate starter templates
function generateTemplates(fnName, params, returnType, sampleRet) {
  const jsParams = params.join(', ');
  const pyParams = params.map(p => `${p}`).join(', ');
  const javaParams = params.map(p => `int[] ${p}`).join(', '); // fallback generic
  
  return {
    javascript: `/**\n * @param ${params.map(p => `{any} ${p}`).join('\n * @param ')}\n * @return {any}\n */\nfunction ${fnName}(${jsParams}) {\n    // Write your solution here\n    \n}`,
    python: `class Solution:\n    def ${fnName}(self, ${pyParams}):\n        # Write your solution here\n        pass`,
    java: `class Solution {\n    public ${returnType || 'int[]'} ${fnName}(${javaParams}) {\n        // Write your solution here\n        return ${sampleRet || 'null'};\n    }\n}`,
    cpp: `class Solution {\npublic:\n    ${returnType || 'vector<int>'} ${fnName}(${javaParams}) {\n        // Write your solution here\n        return {};\n    }\n};`
  };
}

// Curated high-yield standard problems with exact execution testcases
const CURATED_ENRICHMENTS = {
  1: {
    functionName: 'twoSum',
    params: ['nums', 'target'],
    testCases: [
      { args: [[2, 7, 11, 15], 9], rawInput: "nums = [2,7,11,15], target = 9", expected: [0, 1], expectedRaw: "[0,1]" },
      { args: [[3, 2, 4], 6], rawInput: "nums = [3,2,4], target = 6", expected: [1, 2], expectedRaw: "[1,2]" },
      { args: [[3, 3], 6], rawInput: "nums = [3,3], target = 6", expected: [0, 1], expectedRaw: "[0,1]" },
      { args: [[1, 5, 8, 12, 19], 20], rawInput: "nums = [1,5,8,12,19], target = 20", expected: [0, 4], expectedRaw: "[0,4]", hidden: true },
      { args: [[-3, 4, 3, 90], 0], rawInput: "nums = [-3,4,3,90], target = 0", expected: [0, 2], expectedRaw: "[0,2]", hidden: true }
    ],
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]." },
      { input: "nums = [3,3], target = 6", output: "[0,1]", explanation: "Because nums[0] + nums[3] == 6, we return [0, 1]." }
    ],
    starterTemplates: {
      javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}`,
      python: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            diff = target - num\n            if diff in seen:\n                return [seen[diff], i]\n            seen[num] = i\n        return []`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (map.containsKey(comp)) {\n                return new int[] { map.get(comp), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> map;\n        for (int i = 0; i < nums.size(); i++) {\n            int comp = target - nums[i];\n            if (map.count(comp)) return {map[comp], i};\n            map[nums[i]] = i;\n        }\n        return {};\n    }\n};`
    }
  },
  2: {
    functionName: 'isValid',
    params: ['s'],
    testCases: [
      { args: ["()"], rawInput: 's = "()"', expected: true, expectedRaw: "true" },
      { args: ["()[]{}"], rawInput: 's = "()[]{}"', expected: true, expectedRaw: "true" },
      { args: ["(]"], rawInput: 's = "(]"', expected: false, expectedRaw: "false" },
      { args: ["([)]"], rawInput: 's = "([)]"', expected: false, expectedRaw: "false", hidden: true },
      { args: ["{[]}"], rawInput: 's = "{[]}"', expected: true, expectedRaw: "true", hidden: true }
    ],
    examples: [
      { input: 's = "()"', output: "true", explanation: "The parentheses are opened and closed in the correct order." },
      { input: 's = "()[]{}"', output: "true", explanation: "All types of brackets match properly." },
      { input: 's = "(]"', output: "false", explanation: "Closing square bracket does not match open round bracket." }
    ],
    starterTemplates: {
      javascript: `/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n    const stack = [];\n    const map = { ')': '(', '}': '{', ']': '[' };\n    for (const char of s) {\n        if (char in map) {\n            if (stack.pop() !== map[char]) return false;\n        } else {\n            stack.push(char);\n        }\n    }\n    return stack.length === 0;\n}`,
      python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {")": "(", "}": "{", "]": "["}\n        for char in s:\n            if char in mapping:\n                top = stack.pop() if stack else '#'\n                if mapping[char] != top:\n                    return False\n            else:\n                stack.append(char)\n        return not stack`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(') st.push(')');\n            else if (c == '{') st.push('}');\n            else if (c == '[') st.push(']');\n            else {\n                if (st.empty() || st.top() != c) return false;\n                st.pop();\n            }\n        }\n        return st.empty();\n    }\n};`
    }
  },
  4: {
    functionName: 'maxSubArray',
    params: ['nums'],
    testCases: [
      { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], rawInput: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expected: 6, expectedRaw: "6" },
      { args: [[1]], rawInput: "nums = [1]", expected: 1, expectedRaw: "1" },
      { args: [[5, 4, -1, 7, 8]], rawInput: "nums = [5,4,-1,7,8]", expected: 23, expectedRaw: "23" },
      { args: [[-1, -2, -3]], rawInput: "nums = [-1,-2,-3]", expected: -1, expectedRaw: "-1", hidden: true },
      { args: [[-2, -1]], rawInput: "nums = [-2,-1]", expected: -1, expectedRaw: "-1", hidden: true }
    ],
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1", explanation: "The single element array has sum 1." },
      { input: "nums = [5,4,-1,7,8]", output: "23", explanation: "The subarray [5,4,-1,7,8] has the largest sum 23." }
    ],
    starterTemplates: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxSubArray(nums) {\n    let max = nums[0];\n    let sum = 0;\n    for (const num of nums) {\n        sum += num;\n        if (sum > max) max = sum;\n        if (sum < 0) sum = 0;\n    }\n    return max;\n}`,
      python: `class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        max_sum = nums[0]\n        cur = 0\n        for n in nums:\n            cur += n\n            if cur > max_sum: max_sum = cur\n            if cur < 0: cur = 0\n        return max_sum`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        int max = nums[0], sum = 0;\n        for (int n : nums) {\n            sum += n;\n            if (sum > max) max = sum;\n            if (sum < 0) sum = 0;\n        }\n        return max;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int maxSum = nums[0], cur = 0;\n        for (int n : nums) {\n            cur += n;\n            if (cur > maxSum) maxSum = cur;\n            if (cur < 0) cur = 0;\n        }\n        return maxSum;\n    }\n};`
    }
  }
};

console.log('Script template ready.');

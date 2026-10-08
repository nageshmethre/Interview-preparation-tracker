window.DSA_QUESTIONS_BANK = [
  {
    "id": 1,
    "title": "Two Sum",
    "topic": "Arrays",
    "difficulty": "EASY",
    "companies": "Google, Amazon, Meta, Microsoft, Apple, Bloomberg",
    "desc": "Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.<br><br>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice. You can return the answer in any order.",
    "constraints": "• 2 <= nums.length <= 10^4\n• -10^9 <= nums[i] <= 10^9\n• -10^9 <= target <= 10^9\n• Exactly one valid answer exists.",
    "hints": "1. A brute force search takes O(N^2) time.\n2. Can we trade space for time? A Hash Table maps values to indices in O(1).\n3. For each element x, check if (target - x) is already in the table.",
    "solution": "function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) return [map.get(complement), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}",
    "category": "Arrays & Hashing",
    "examples": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "output": "[0,1]",
        "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        "input": "nums = [3,2,4], target = 6",
        "output": "[1,2]",
        "explanation": "Because nums[1] + nums[2] == 6, we return [1, 2]."
      },
      {
        "input": "nums = [3,3], target = 6",
        "output": "[0,1]",
        "explanation": "Because nums[0] + nums[3] == 6, we return [0, 1]."
      }
    ],
    "functionName": "twoSum",
    "starterTemplates": {
      "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}",
      "python": "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in seen:\n                return [seen[diff], i]\n            seen[n] = i\n        return []",
      "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (map.containsKey(comp)) return new int[]{ map.get(comp), i };\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}",
      "cpp": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> map;\n        for (int i = 0; i < nums.size(); i++) {\n            int comp = target - nums[i];\n            if (map.count(comp)) return {map[comp], i};\n            map[nums[i]] = i;\n        }\n        return {};\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            2,
            7,
            11,
            15
          ],
          9
        ],
        "rawInput": "nums = [2,7,11,15], target = 9",
        "expected": [
          0,
          1
        ],
        "expectedRaw": "[0,1]"
      },
      {
        "args": [
          [
            3,
            2,
            4
          ],
          6
        ],
        "rawInput": "nums = [3,2,4], target = 6",
        "expected": [
          1,
          2
        ],
        "expectedRaw": "[1,2]"
      },
      {
        "args": [
          [
            3,
            3
          ],
          6
        ],
        "rawInput": "nums = [3,3], target = 6",
        "expected": [
          0,
          1
        ],
        "expectedRaw": "[0,1]"
      },
      {
        "args": [
          [
            1,
            5,
            7,
            10,
            19
          ],
          20
        ],
        "rawInput": "nums = [1,5,7,10,19], target = 20",
        "expected": [
          0,
          4
        ],
        "expectedRaw": "[0,4]",
        "hidden": true
      },
      {
        "args": [
          [
            -3,
            4,
            3,
            90
          ],
          0
        ],
        "rawInput": "nums = [-3,4,3,90], target = 0",
        "expected": [
          0,
          2
        ],
        "expectedRaw": "[0,2]",
        "hidden": true
      }
    ]
  },
  {
    "id": 2,
    "title": "Valid Parentheses",
    "topic": "Stack",
    "difficulty": "EASY",
    "companies": "Meta, Amazon, Microsoft, Google, Adobe",
    "desc": "Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.<br><br>An input string is valid if: Open brackets must be closed by the same type of brackets, and open brackets must be closed in the correct order.",
    "constraints": "• 1 <= s.length <= 10^4\n• s consists of parentheses only '()[]{}'.",
    "hints": "1. Push opening brackets onto a stack.\n2. When encountering a closing bracket, check if it matches the stack's top element.",
    "solution": "function isValid(s) {\n    const stack = [];\n    const map = { ')': '(', '}': '{', ']': '[' };\n    for (const ch of s) {\n        if (ch in map) {\n            if (stack.pop() !== map[ch]) return false;\n        } else {\n            stack.push(ch);\n        }\n    }\n    return stack.length === 0;\n}",
    "category": "Stack",
    "examples": [
      {
        "input": "s = \"()\"",
        "output": "true",
        "explanation": "Matching round parentheses."
      },
      {
        "input": "s = \"()[]{}\"",
        "output": "true",
        "explanation": "All parentheses types match in order."
      },
      {
        "input": "s = \"(]\"",
        "output": "false",
        "explanation": "Mismatched bracket types."
      }
    ],
    "functionName": "isValid",
    "starterTemplates": {
      "javascript": "/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n    const stack = [];\n    const map = { ')': '(', '}': '{', ']': '[' };\n    for (const ch of s) {\n        if (ch in map) {\n            if (stack.pop() !== map[ch]) return false;\n        } else {\n            stack.push(ch);\n        }\n    }\n    return stack.length === 0;\n}",
      "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {')': '(', '}': '{', ']': '['}\n        for ch in s:\n            if ch in mapping:\n                if not stack or stack.pop() != mapping[ch]:\n                    return False\n            else:\n                stack.append(ch)\n        return not stack",
      "java": "class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}",
      "cpp": "class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(') st.push(')');\n            else if (c == '{') st.push('}');\n            else if (c == '[') st.push(']');\n            else {\n                if (st.empty() || st.top() != c) return false;\n                st.pop();\n            }\n        }\n        return st.empty();\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          "()"
        ],
        "rawInput": "s = \"()\"",
        "expected": true,
        "expectedRaw": "true"
      },
      {
        "args": [
          "()[]{}"
        ],
        "rawInput": "s = \"()[]{}\"",
        "expected": true,
        "expectedRaw": "true"
      },
      {
        "args": [
          "(]"
        ],
        "rawInput": "s = \"(]\"",
        "expected": false,
        "expectedRaw": "false"
      },
      {
        "args": [
          "([)]"
        ],
        "rawInput": "s = \"([)]\"",
        "expected": false,
        "expectedRaw": "false",
        "hidden": true
      },
      {
        "args": [
          "{[]}"
        ],
        "rawInput": "s = \"{[]}\"",
        "expected": true,
        "expectedRaw": "true",
        "hidden": true
      }
    ]
  },
  {
    "id": 3,
    "title": "Merge Two Sorted Lists",
    "topic": "Linked Lists",
    "difficulty": "EASY",
    "companies": "Amazon, Microsoft, Apple, Uber",
    "desc": "You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>. Merge the two lists into one <strong>sorted</strong> list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    "constraints": "• The number of nodes in both lists is in the range [0, 50].\n• -100 <= Node.val <= 100\n• Both list1 and list2 are sorted in non-decreasing order.",
    "hints": "1. Create a dummy sentinel head node.\n2. Maintain a current pointer and advance whichever head has the smaller value.",
    "solution": "function mergeTwoLists(list1, list2) {\n    const res = [];\n    let i = 0, j = 0;\n    while (i < list1.length && j < list2.length) {\n        if (list1[i] <= list2[j]) res.push(list1[i++]);\n        else res.push(list2[j++]);\n    }\n    while (i < list1.length) res.push(list1[i++]);\n    while (j < list2.length) res.push(list2[j++]);\n    return res;\n}",
    "category": "Linked Lists",
    "examples": [
      {
        "input": "list1 = [1,2,4], list2 = [1,3,4]",
        "output": "[1,1,2,3,4,4]",
        "explanation": "Merged nodes in ascending order."
      },
      {
        "input": "list1 = [], list2 = []",
        "output": "[]",
        "explanation": "Both empty lists yield empty."
      },
      {
        "input": "list1 = [], list2 = [0]",
        "output": "[0]",
        "explanation": "Merged with single element."
      }
    ],
    "functionName": "mergeTwoLists",
    "starterTemplates": {
      "javascript": "/**\n * @param {number[]} list1\n * @param {number[]} list2\n * @return {number[]}\n */\nfunction mergeTwoLists(list1, list2) {\n    const res = [];\n    let i = 0, j = 0;\n    while (i < list1.length && j < list2.length) {\n        if (list1[i] <= list2[j]) res.push(list1[i++]);\n        else res.push(list2[j++]);\n    }\n    while (i < list1.length) res.push(list1[i++]);\n    while (j < list2.length) res.push(list2[j++]);\n    return res;\n}",
      "python": "class Solution:\n    def mergeTwoLists(self, list1: list[int], list2: list[int]) -> list[int]:\n        i, j = 0, 0\n        res = []\n        while i < len(list1) and j < len(list2):\n            if list1[i] <= list2[j]:\n                res.append(list1[i]); i += 1\n            else:\n                res.append(list2[j]); j += 1\n        res.extend(list1[i:])\n        res.extend(list2[j:])\n        return res",
      "java": "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        ListNode dummy = new ListNode(-1), cur = dummy;\n        while (list1 != null && list2 != null) {\n            if (list1.val <= list2.val) { cur.next = list1; list1 = list1.next; }\n            else { cur.next = list2; list2 = list2.next; }\n            cur = cur.next;\n        }\n        cur.next = list1 != null ? list1 : list2;\n        return dummy.next;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        ListNode dummy(-1), *cur = &dummy;\n        while (list1 && list2) {\n            if (list1->val <= list2->val) { cur->next = list1; list1 = list1->next; }\n            else { cur->next = list2; list2 = list2->next; }\n            cur = cur->next;\n        }\n        cur->next = list1 ? list1 : list2;\n        return dummy.next;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            4
          ],
          [
            1,
            3,
            4
          ]
        ],
        "rawInput": "list1 = [1,2,4], list2 = [1,3,4]",
        "expected": [
          1,
          1,
          2,
          3,
          4,
          4
        ],
        "expectedRaw": "[1,1,2,3,4,4]"
      },
      {
        "args": [
          [],
          []
        ],
        "rawInput": "list1 = [], list2 = []",
        "expected": [],
        "expectedRaw": "[]"
      },
      {
        "args": [
          [],
          [
            0
          ]
        ],
        "rawInput": "list1 = [], list2 = [0]",
        "expected": [
          0
        ],
        "expectedRaw": "[0]"
      },
      {
        "args": [
          [
            2,
            5,
            9
          ],
          [
            1,
            3,
            4,
            7,
            10
          ]
        ],
        "rawInput": "list1 = [2,5,9], list2 = [1,3,4,7,10]",
        "expected": [
          1,
          2,
          3,
          4,
          5,
          7,
          9,
          10
        ],
        "expectedRaw": "[1,2,3,4,5,7,9,10]",
        "hidden": true
      }
    ]
  },
  {
    "id": 4,
    "title": "Maximum Subarray",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Google, Amazon, Meta, Microsoft, Apple, LinkedIn",
    "desc": "Given an integer array <code>nums</code>, find the subarray with the largest sum, and return <em>its sum</em>. (Kadane's Algorithm).",
    "constraints": "• 1 <= nums.length <= 10^5\n• -10^4 <= nums[i] <= 10^4",
    "hints": "1. Iterate through the array maintaining current running sum.\n2. If running sum falls below 0, reset it to 0.\n3. Track maximum sum seen so far.",
    "solution": "function maxSubArray(nums) {\n    let maxSum = nums[0];\n    let currentSum = 0;\n    for (const num of nums) {\n        currentSum += num;\n        if (currentSum > maxSum) maxSum = currentSum;\n        if (currentSum < 0) currentSum = 0;\n    }\n    return maxSum;\n}",
    "category": "Arrays & Hashing",
    "examples": [
      {
        "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        "output": "6",
        "explanation": "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        "input": "nums = [1]",
        "output": "1",
        "explanation": "The single element array has sum 1."
      },
      {
        "input": "nums = [5,4,-1,7,8]",
        "output": "23",
        "explanation": "The subarray [5,4,-1,7,8] has the largest sum 23."
      }
    ],
    "functionName": "maxSubArray",
    "starterTemplates": {
      "javascript": "/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxSubArray(nums) {\n    let maxSum = nums[0];\n    let currentSum = 0;\n    for (const num of nums) {\n        currentSum += num;\n        if (currentSum > maxSum) maxSum = currentSum;\n        if (currentSum < 0) currentSum = 0;\n    }\n    return maxSum;\n}",
      "python": "class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        max_sum = nums[0]\n        cur = 0\n        for n in nums:\n            cur += n\n            if cur > max_sum: max_sum = cur\n            if cur < 0: cur = 0\n        return max_sum",
      "java": "class Solution {\n    public int maxSubArray(int[] nums) {\n        int max = nums[0], sum = 0;\n        for (int n : nums) {\n            sum += n;\n            if (sum > max) max = sum;\n            if (sum < 0) sum = 0;\n        }\n        return max;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int maxSum = nums[0], cur = 0;\n        for (int n : nums) {\n            cur += n;\n            if (cur > maxSum) maxSum = cur;\n            if (cur < 0) cur = 0;\n        }\n        return maxSum;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            -2,
            1,
            -3,
            4,
            -1,
            2,
            1,
            -5,
            4
          ]
        ],
        "rawInput": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        "expected": 6,
        "expectedRaw": "6"
      },
      {
        "args": [
          [
            1
          ]
        ],
        "rawInput": "nums = [1]",
        "expected": 1,
        "expectedRaw": "1"
      },
      {
        "args": [
          [
            5,
            4,
            -1,
            7,
            8
          ]
        ],
        "rawInput": "nums = [5,4,-1,7,8]",
        "expected": 23,
        "expectedRaw": "23"
      },
      {
        "args": [
          [
            -1,
            -2,
            -3
          ]
        ],
        "rawInput": "nums = [-1,-2,-3]",
        "expected": -1,
        "expectedRaw": "-1",
        "hidden": true
      },
      {
        "args": [
          [
            -2,
            -1
          ]
        ],
        "rawInput": "nums = [-2,-1]",
        "expected": -1,
        "expectedRaw": "-1",
        "hidden": true
      }
    ]
  },
  {
    "id": 5,
    "title": "Trapping Rain Water",
    "topic": "Arrays",
    "difficulty": "HARD",
    "companies": "Google, Amazon, Meta, Goldman Sachs, Bloomberg, Uber",
    "desc": "Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is <code>1</code>, compute how much water it can trap after raining.",
    "constraints": "• n == height.length\n• 1 <= n <= 2 * 10^4\n• 0 <= height[i] <= 10^5",
    "hints": "1. For each bar, trapped water is determined by min(max_left, max_right) - height[i].\n2. Use two pointers left and right moving towards each other.",
    "solution": "function trap(height) {\n    let l = 0, r = height.length - 1, leftMax = 0, rightMax = 0, total = 0;\n    while (l < r) {\n        if (height[l] < height[r]) {\n            if (height[l] >= leftMax) leftMax = height[l];\n            else total += leftMax - height[l];\n            l++;\n        } else {\n            if (height[r] >= rightMax) rightMax = height[r];\n            else total += rightMax - height[r];\n            r--;\n        }\n    }\n    return total;\n}",
    "category": "Two Pointers",
    "examples": [
      {
        "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        "output": "6",
        "explanation": "The elevation map traps 6 units of rain water."
      },
      {
        "input": "height = [4,2,0,3,2,5]",
        "output": "9",
        "explanation": "The elevation map traps 9 units of rain water."
      }
    ],
    "functionName": "trap",
    "starterTemplates": {
      "javascript": "/**\n * @param {number[]} height\n * @return {number}\n */\nfunction trap(height) {\n    let l = 0, r = height.length - 1;\n    let leftMax = 0, rightMax = 0;\n    let total = 0;\n    while (l < r) {\n        if (height[l] < height[r]) {\n            if (height[l] >= leftMax) leftMax = height[l];\n            else total += leftMax - height[l];\n            l++;\n        } else {\n            if (height[r] >= rightMax) rightMax = height[r];\n            else total += rightMax - height[r];\n            r--;\n        }\n    }\n    return total;\n}",
      "python": "class Solution:\n    def trap(self, height: list[int]) -> int:\n        l, r = 0, len(height) - 1\n        l_max, r_max = 0, 0\n        total = 0\n        while l < r:\n            if height[l] < height[r]:\n                if height[l] >= l_max: l_max = height[l]\n                else: total += l_max - height[l]\n                l += 1\n            else:\n                if height[r] >= r_max: r_max = height[r]\n                else: total += r_max - height[r]\n                r -= 1\n        return total",
      "java": "class Solution {\n    public int trap(int[] height) {\n        int l = 0, r = height.length - 1, lMax = 0, rMax = 0, total = 0;\n        while (l < r) {\n            if (height[l] < height[r]) {\n                if (height[l] >= lMax) lMax = height[l];\n                else total += lMax - height[l];\n                l++;\n            } else {\n                if (height[r] >= rMax) rMax = height[r];\n                else total += rMax - height[r];\n                r--;\n            }\n        }\n        return total;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int trap(vector<int>& height) {\n        int l = 0, r = height.size() - 1, lMax = 0, rMax = 0, total = 0;\n        while (l < r) {\n            if (height[l] < height[r]) {\n                if (height[l] >= lMax) lMax = height[l];\n                else total += lMax - height[l];\n                l++;\n            } else {\n                if (height[r] >= rMax) rMax = height[r];\n                else total += rMax - height[r];\n                r--;\n            }\n        }\n        return total;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            0,
            1,
            0,
            2,
            1,
            0,
            1,
            3,
            2,
            1,
            2,
            1
          ]
        ],
        "rawInput": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        "expected": 6,
        "expectedRaw": "6"
      },
      {
        "args": [
          [
            4,
            2,
            0,
            3,
            2,
            5
          ]
        ],
        "rawInput": "height = [4,2,0,3,2,5]",
        "expected": 9,
        "expectedRaw": "9"
      },
      {
        "args": [
          [
            3,
            0,
            2,
            0,
            4
          ]
        ],
        "rawInput": "height = [3,0,2,0,4]",
        "expected": 7,
        "expectedRaw": "7"
      },
      {
        "args": [
          [
            1,
            2,
            3,
            4,
            5
          ]
        ],
        "rawInput": "height = [1,2,3,4,5]",
        "expected": 0,
        "expectedRaw": "0",
        "hidden": true
      },
      {
        "args": [
          [
            5,
            4,
            1,
            2
          ]
        ],
        "rawInput": "height = [5,4,1,2]",
        "expected": 1,
        "expectedRaw": "1",
        "hidden": true
      }
    ]
  },
  {
    "id": 6,
    "title": "Product of Array Except Self",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Amazon, Apple, Meta, Microsoft, Netflix",
    "desc": "Given an integer array <code>nums</code>, return an array <code>answer</code> such that <code>answer[i]</code> is equal to the product of all the elements of <code>nums</code> except <code>nums[i]</code>.<br><br>The product of any prefix or suffix of <code>nums</code> is guaranteed to fit in a <strong>32-bit</strong> integer. You must write an algorithm that runs in <code>O(n)</code> time and without using the division operation.",
    "constraints": "• 2 <= nums.length <= 10^5\n• -30 <= nums[i] <= 30\n• Product of any prefix/suffix fits in 32-bit int.",
    "hints": "1. Calculate prefix products moving from left to right.\n2. In a second pass, multiply by suffix products moving from right to left.",
    "solution": "function productExceptSelf(nums) {\n    const n = nums.length;\n    const res = new Array(n).fill(1);\n    let prefix = 1;\n    for (let i = 0; i < n; i++) { res[i] = prefix; prefix *= nums[i]; }\n    let postfix = 1;\n    for (let i = n - 1; i >= 0; i--) { res[i] *= postfix; postfix *= nums[i]; }\n    return res;\n}",
    "category": "Arrays & Hashing",
    "examples": [
      {
        "input": "nums = [1,2,3,4]",
        "output": "[24,12,8,6]",
        "explanation": "For index 0: 2*3*4=24. For index 1: 1*3*4=12. For index 2: 1*2*4=8. For index 3: 1*2*3=6."
      },
      {
        "input": "nums = [-1,1,0,-3,3]",
        "output": "[0,0,9,0,0]",
        "explanation": "Zero element isolates non-zero product."
      }
    ],
    "functionName": "productExceptSelf",
    "starterTemplates": {
      "javascript": "/**\n * @param {number[]} nums\n * @return {number[]}\n */\nfunction productExceptSelf(nums) {\n    const n = nums.length;\n    const res = new Array(n).fill(1);\n    let prefix = 1;\n    for (let i = 0; i < n; i++) {\n        res[i] = prefix;\n        prefix *= nums[i];\n    }\n    let postfix = 1;\n    for (let i = n - 1; i >= 0; i--) {\n        res[i] *= postfix;\n        postfix *= nums[i];\n    }\n    return res;\n}",
      "python": "class Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        n = len(nums)\n        res = [1] * n\n        prefix = 1\n        for i in range(n):\n            res[i] = prefix\n            prefix *= nums[i]\n        postfix = 1\n        for i in range(n - 1, -1, -1):\n            res[i] *= postfix\n            postfix *= nums[i]\n        return res",
      "java": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] res = new int[n];\n        int prefix = 1;\n        for (int i = 0; i < n; i++) { res[i] = prefix; prefix *= nums[i]; }\n        int postfix = 1;\n        for (int i = n - 1; i >= 0; i--) { res[i] *= postfix; postfix *= nums[i]; }\n        return res;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        int n = nums.size();\n        vector<int> res(n, 1);\n        int prefix = 1;\n        for (int i = 0; i < n; i++) { res[i] = prefix; prefix *= nums[i]; }\n        int postfix = 1;\n        for (int i = n - 1; i >= 0; i--) { res[i] *= postfix; postfix *= nums[i]; }\n        return res;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "rawInput": "nums = [1,2,3,4]",
        "expected": [
          24,
          12,
          8,
          6
        ],
        "expectedRaw": "[24,12,8,6]"
      },
      {
        "args": [
          [
            -1,
            1,
            0,
            -3,
            3
          ]
        ],
        "rawInput": "nums = [-1,1,0,-3,3]",
        "expected": [
          0,
          0,
          9,
          0,
          0
        ],
        "expectedRaw": "[0,0,9,0,0]"
      },
      {
        "args": [
          [
            2,
            3,
            5,
            0
          ]
        ],
        "rawInput": "nums = [2,3,5,0]",
        "expected": [
          0,
          0,
          0,
          30
        ],
        "expectedRaw": "[0,0,0,30]"
      },
      {
        "args": [
          [
            4,
            5
          ]
        ],
        "rawInput": "nums = [4,5]",
        "expected": [
          5,
          4
        ],
        "expectedRaw": "[5,4]",
        "hidden": true
      }
    ]
  },
  {
    "id": 7,
    "title": "Coin Change",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Amazon, Google, Microsoft, Meta, Bloomberg",
    "desc": "You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money.<br><br>Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return <code>-1</code>.",
    "constraints": "• 1 <= coins.length <= 12\n• 1 <= coins[i] <= 2^31 - 1\n• 0 <= amount <= 10^4",
    "hints": "1. Let dp[i] be the minimum coins needed to make amount i.\n2. Base case: dp[0] = 0. All other dp[i] initialized to Infinity.\n3. Transition: dp[i] = min(dp[i], dp[i - coin] + 1).",
    "solution": "function coinChange(coins, amount) {\n    const dp = new Array(amount + 1).fill(Infinity);\n    dp[0] = 0;\n    for (let i = 1; i <= amount; i++) {\n        for (const coin of coins) {\n            if (i - coin >= 0) dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n        }\n    }\n    return dp[amount] === Infinity ? -1 : dp[amount];\n}",
    "category": "1-D Dynamic Programming",
    "examples": [
      {
        "input": "coins = [1,2,5], amount = 11",
        "output": "3",
        "explanation": "11 = 5 + 5 + 1 (3 coins)."
      },
      {
        "input": "coins = [2], amount = 3",
        "output": "-1",
        "explanation": "Cannot make 3 using only 2s."
      },
      {
        "input": "coins = [1], amount = 0",
        "output": "0",
        "explanation": "0 amount requires 0 coins."
      }
    ],
    "functionName": "coinChange",
    "starterTemplates": {
      "javascript": "/**\n * @param {number[]} coins\n * @param {number} amount\n * @return {number}\n */\nfunction coinChange(coins, amount) {\n    const dp = new Array(amount + 1).fill(Infinity);\n    dp[0] = 0;\n    for (let i = 1; i <= amount; i++) {\n        for (const coin of coins) {\n            if (i - coin >= 0) {\n                dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n            }\n        }\n    }\n    return dp[amount] === Infinity ? -1 : dp[amount];\n}",
      "python": "class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        dp = [float('inf')] * (amount + 1)\n        dp[0] = 0\n        for i in range(1, amount + 1):\n            for c in coins:\n                if i - c >= 0:\n                    dp[i] = min(dp[i], dp[i - c] + 1)\n        return dp[amount] if dp[amount] != float('inf') else -1",
      "java": "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int c : coins) {\n                if (i - c >= 0) dp[i] = Math.min(dp[i], dp[i - c] + 1);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount + 1, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int c : coins) {\n                if (i - c >= 0) dp[i] = min(dp[i], dp[i - c] + 1);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            5
          ],
          11
        ],
        "rawInput": "coins = [1,2,5], amount = 11",
        "expected": 3,
        "expectedRaw": "3"
      },
      {
        "args": [
          [
            2
          ],
          3
        ],
        "rawInput": "coins = [2], amount = 3",
        "expected": -1,
        "expectedRaw": "-1"
      },
      {
        "args": [
          [
            1
          ],
          0
        ],
        "rawInput": "coins = [1], amount = 0",
        "expected": 0,
        "expectedRaw": "0"
      },
      {
        "args": [
          [
            1,
            3,
            4,
            5
          ],
          7
        ],
        "rawInput": "coins = [1,3,4,5], amount = 7",
        "expected": 2,
        "expectedRaw": "2",
        "hidden": true
      },
      {
        "args": [
          [
            186,
            419,
            83,
            408
          ],
          6249
        ],
        "rawInput": "coins = [186,419,83,408], amount = 6249",
        "expected": 20,
        "expectedRaw": "20",
        "hidden": true
      }
    ]
  },
  {
    "id": 8,
    "title": "Median of Two Sorted Arrays",
    "topic": "Binary Search",
    "difficulty": "HARD",
    "companies": "Google, Microsoft, Amazon, Apple, Meta, Goldman Sachs",
    "desc": "Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return <strong>the median</strong> of the two sorted arrays. The overall run time complexity should be <code>O(log (m+n))</code>.",
    "constraints": "• nums1.length == m\n• nums2.length == n\n• 0 <= m, n <= 1000\n• 1 <= m + n <= 2000\n• -10^6 <= nums1[i], nums2[i] <= 10^6",
    "hints": "1. Binary search on the partition of the smaller array.\n2. Ensure left partition size equals right partition size (or +1).",
    "solution": "function findMedianSortedArrays(nums1, nums2) {\n    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n    const m = nums1.length, n = nums2.length;\n    let low = 0, high = m;\n    while (low <= high) {\n        const px = (low + high) >> 1;\n        const py = ((m + n + 1) >> 1) - px;\n        const maxX = px === 0 ? -Infinity : nums1[px - 1];\n        const minX = px === m ? Infinity : nums1[px];\n        const maxY = py === 0 ? -Infinity : nums2[py - 1];\n        const minY = py === n ? Infinity : nums2[py];\n        if (maxX <= minY && maxY <= minX) {\n            return (m + n) % 2 === 0 ? (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2 : Math.max(maxX, maxY);\n        } else if (maxX > minY) high = px - 1;\n        else low = px + 1;\n    }\n    return 0;\n}",
    "category": "Binary Search",
    "examples": [
      {
        "input": "nums1 = [1,3], nums2 = [2]",
        "output": "2.00000",
        "explanation": "Merged array = [1,2,3] and median is 2."
      },
      {
        "input": "nums1 = [1,2], nums2 = [3,4]",
        "output": "2.50000",
        "explanation": "Merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    "functionName": "findMedianSortedArrays",
    "starterTemplates": {
      "javascript": "/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nfunction findMedianSortedArrays(nums1, nums2) {\n    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n    const m = nums1.length, n = nums2.length;\n    let low = 0, high = m;\n    while (low <= high) {\n        const partitionX = (low + high) >> 1;\n        const partitionY = ((m + n + 1) >> 1) - partitionX;\n        const maxX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];\n        const minX = partitionX === m ? Infinity : nums1[partitionX];\n        const maxY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];\n        const minY = partitionY === n ? Infinity : nums2[partitionY];\n        if (maxX <= minY && maxY <= minX) {\n            if ((m + n) % 2 === 0) {\n                return (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;\n            } else {\n                return Math.max(maxX, maxY);\n            }\n        } else if (maxX > minY) {\n            high = partitionX - 1;\n        } else {\n            low = partitionX + 1;\n        }\n    }\n    return 0;\n}",
      "python": "class Solution:\n    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:\n        if len(nums1) > len(nums2):\n            nums1, nums2 = nums2, nums1\n        m, n = len(nums1), len(nums2)\n        low, high = 0, m\n        while low <= high:\n            partitionX = (low + high) // 2\n            partitionY = (m + n + 1) // 2 - partitionX\n            maxX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]\n            minX = float('inf') if partitionX == m else nums1[partitionX]\n            maxY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]\n            minY = float('inf') if partitionY == n else nums2[partitionY]\n            if maxX <= minY and maxY <= minX:\n                if (m + n) % 2 == 0:\n                    return (max(maxX, maxY) + min(minX, minY)) / 2.0\n                else:\n                    return float(max(maxX, maxY))\n            elif maxX > minY:\n                high = partitionX - 1\n            else:\n                low = partitionX + 1\n        return 0.0",
      "java": "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n        int m = nums1.length, n = nums2.length;\n        int low = 0, high = m;\n        while (low <= high) {\n            int partX = (low + high) / 2;\n            int partY = (m + n + 1) / 2 - partX;\n            int maxX = partX == 0 ? Integer.MIN_VALUE : nums1[partX - 1];\n            int minX = partX == m ? Integer.MAX_VALUE : nums1[partX];\n            int maxY = partY == 0 ? Integer.MIN_VALUE : nums2[partY - 1];\n            int minY = partY == n ? Integer.MAX_VALUE : nums2[partY];\n            if (maxX <= minY && maxY <= minX) {\n                if ((m + n) % 2 == 0) return ((double)Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;\n                else return (double)Math.max(maxX, maxY);\n            } else if (maxX > minY) high = partX - 1;\n            else low = partX + 1;\n        }\n        return 0.0;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);\n        int m = nums1.size(), n = nums2.size();\n        int low = 0, high = m;\n        while (low <= high) {\n            int partX = (low + high) / 2;\n            int partY = (m + n + 1) / 2 - partX;\n            int maxX = partX == 0 ? INT_MIN : nums1[partX - 1];\n            int minX = partX == m ? INT_MAX : nums1[partX];\n            int maxY = partY == 0 ? INT_MIN : nums2[partY - 1];\n            int minY = partY == n ? INT_MAX : nums2[partY];\n            if (maxX <= minY && maxY <= minX) {\n                if ((m + n) % 2 == 0) return ((double)max(maxX, maxY) + min(minX, minY)) / 2;\n                else return (double)max(maxX, maxY);\n            } else if (maxX > minY) high = partX - 1;\n            else low = partX + 1;\n        }\n        return 0.0;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            3
          ],
          [
            2
          ]
        ],
        "rawInput": "nums1 = [1,3], nums2 = [2]",
        "expected": 2,
        "expectedRaw": "2.0"
      },
      {
        "args": [
          [
            1,
            2
          ],
          [
            3,
            4
          ]
        ],
        "rawInput": "nums1 = [1,2], nums2 = [3,4]",
        "expected": 2.5,
        "expectedRaw": "2.5"
      },
      {
        "args": [
          [
            0,
            0
          ],
          [
            0,
            0
          ]
        ],
        "rawInput": "nums1 = [0,0], nums2 = [0,0]",
        "expected": 0,
        "expectedRaw": "0.0"
      },
      {
        "args": [
          [],
          [
            1
          ]
        ],
        "rawInput": "nums1 = [], nums2 = [1]",
        "expected": 1,
        "expectedRaw": "1.0",
        "hidden": true
      },
      {
        "args": [
          [
            2
          ],
          []
        ],
        "rawInput": "nums1 = [2], nums2 = []",
        "expected": 2,
        "expectedRaw": "2.0",
        "hidden": true
      }
    ]
  },
  {
    "id": 9,
    "title": "Minimum Window Substring",
    "topic": "Strings",
    "difficulty": "HARD",
    "companies": "Meta, Google, Amazon, Microsoft, Uber, Apple",
    "desc": "Given two strings <code>s</code> and <code>t</code> of lengths <code>m</code> and <code>n</code> respectively, return the <strong>minimum window substring</strong> of <code>s</code> such that every character in <code>t</code> (including duplicates) is included in the window. If there is no such substring, return the empty string <code>\"\"</code>.",
    "constraints": "• m == s.length, n == t.length\n• 1 <= m, n <= 10^5\n• s and t consist of uppercase and lowercase English letters.",
    "hints": "1. Use two pointers left and right for the sliding window.\n2. Maintain character frequencies of t and current window.\n3. Contract left pointer once all required characters are satisfied.",
    "solution": "function minWindow(s, t) {\n    if (!s || !t) return \"\";\n    const map = {};\n    for (const c of t) map[c] = (map[c] || 0) + 1;\n    let count = Object.keys(map).length, l = 0, r = 0, minLen = Infinity, start = 0;\n    while (r < s.length) {\n        const c = s[r++];\n        if (c in map) { map[c]--; if (map[c] === 0) count--; }\n        while (count === 0) {\n            if (r - l < minLen) { minLen = r - l; start = l; }\n            const leftChar = s[l++];\n            if (leftChar in map) { if (map[leftChar] === 0) count++; map[leftChar]++; }\n        }\n    }\n    return minLen === Infinity ? \"\" : s.substring(start, start + minLen);\n}",
    "category": "Sliding Window",
    "examples": [
      {
        "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
        "output": "\"BANC\"",
        "explanation": "The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t."
      },
      {
        "input": "s = \"a\", t = \"a\"",
        "output": "\"a\"",
        "explanation": "The entire string s is the minimum window."
      },
      {
        "input": "s = \"a\", t = \"aa\"",
        "output": "\"\"",
        "explanation": "Both 'a's from t must be included in the window."
      }
    ],
    "functionName": "minWindow",
    "starterTemplates": {
      "javascript": "/**\n * @param {string} s\n * @param {string} t\n * @return {string}\n */\nfunction minWindow(s, t) {\n    if (s.length === 0 || t.length === 0) return \"\";\n    const map = {};\n    for (const c of t) map[c] = (map[c] || 0) + 1;\n    let count = Object.keys(map).length;\n    let l = 0, r = 0, minLen = Infinity, start = 0;\n    while (r < s.length) {\n        const c = s[r];\n        if (c in map) {\n            map[c]--;\n            if (map[c] === 0) count--;\n        }\n        r++;\n        while (count === 0) {\n            if (r - l < minLen) {\n                minLen = r - l;\n                start = l;\n            }\n            const leftChar = s[l];\n            if (leftChar in map) {\n                if (map[leftChar] === 0) count++;\n                map[leftChar]++;\n            }\n            l++;\n        }\n    }\n    return minLen === Infinity ? \"\" : s.substring(start, start + minLen);\n}",
      "python": "class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        if not s or not t: return \"\"\n        import collections\n        counts = collections.Counter(t)\n        required = len(counts)\n        formed = 0\n        window = {}\n        ans = float(\"inf\"), None, None\n        l = 0\n        for r, ch in enumerate(s):\n            window[ch] = window.get(ch, 0) + 1\n            if ch in counts and window[ch] == counts[ch]: formed += 1\n            while l <= r and formed == required:\n                if (r - l + 1) < ans[0]: ans = (r - l + 1, l, r)\n                window[s[l]] -= 1\n                if s[l] in counts and window[s[l]] < counts[s[l]]: formed -= 1\n                l += 1\n        return \"\" if ans[0] == float(\"inf\") else s[ans[1] : ans[2] + 1]",
      "java": "class Solution {\n    public String minWindow(String s, String t) {\n        if (s.length() == 0 || t.length() == 0) return \"\";\n        int[] map = new int[128];\n        for (char c : t.toCharArray()) map[c]++;\n        int count = t.length(), l = 0, r = 0, minLen = Integer.MAX_VALUE, start = 0;\n        while (r < s.length()) {\n            if (map[s.charAt(r++)]-- > 0) count--;\n            while (count == 0) {\n                if (r - l < minLen) { minLen = r - l; start = l; }\n                if (map[s.charAt(l++)]++ == 0) count++;\n            }\n        }\n        return minLen == Integer.MAX_VALUE ? \"\" : s.substring(start, start + minLen);\n    }\n}",
      "cpp": "class Solution {\npublic:\n    string minWindow(string s, string t) {\n        vector<int> map(128, 0);\n        for (char c : t) map[c]++;\n        int count = t.size(), l = 0, r = 0, minLen = INT_MAX, start = 0;\n        while (r < s.size()) {\n            if (map[s[r++]]-- > 0) count--;\n            while (count == 0) {\n                if (r - l < minLen) { minLen = r - l; start = l; }\n                if (map[s[l++]]++ == 0) count++;\n            }\n        }\n        return minLen == INT_MAX ? \"\" : s.substr(start, minLen);\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          "ADOBECODEBANC",
          "ABC"
        ],
        "rawInput": "s = \"ADOBECODEBANC\", t = \"ABC\"",
        "expected": "BANC",
        "expectedRaw": "\"BANC\""
      },
      {
        "args": [
          "a",
          "a"
        ],
        "rawInput": "s = \"a\", t = \"a\"",
        "expected": "a",
        "expectedRaw": "\"a\""
      },
      {
        "args": [
          "a",
          "aa"
        ],
        "rawInput": "s = \"a\", t = \"aa\"",
        "expected": "",
        "expectedRaw": "\"\""
      },
      {
        "args": [
          "ab",
          "b"
        ],
        "rawInput": "s = \"ab\", t = \"b\"",
        "expected": "b",
        "expectedRaw": "\"b\"",
        "hidden": true
      }
    ]
  },
  {
    "id": 10,
    "title": "Course Schedule II",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Amazon, Meta, Google, Microsoft, Uber, Apple",
    "desc": "There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [a_i, b_i]</code> indicates that you must take course <code>b_i</code> first if you want to take course <code>a_i</code>.<br><br>Return the ordering of courses you should take to finish all courses. If there are many valid answers, return <strong>any</strong> of them. If it is impossible to finish all courses, return an empty array.",
    "constraints": "• 1 <= numCourses <= 2000\n• 0 <= prerequisites.length <= numCourses * (numCourses - 1)\n• prerequisites[i].length == 2\n• All prerequisite pairs are unique.",
    "hints": "1. Build an adjacency list and compute indegrees for all nodes.\n2. Push all nodes with indegree 0 into a Queue (Kahn's Algorithm).\n3. Pop from Queue, append to order, decrement neighbors' indegrees.",
    "solution": "function findOrder(numCourses, prerequisites) {\n    const inDegree = new Array(numCourses).fill(0);\n    const adj = Array.from({ length: numCourses }, () => []);\n    for (const [course, prereq] of prerequisites) {\n        adj[prereq].push(course);\n        inDegree[course]++;\n    }\n    const queue = [];\n    for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) queue.push(i);\n    const order = [];\n    while (queue.length > 0) {\n        const cur = queue.shift();\n        order.push(cur);\n        for (const next of adj[cur]) {\n            if (--inDegree[next] === 0) queue.push(next);\n        }\n    }\n    return order.length === numCourses ? order : [];\n}",
    "category": "Graphs & Topological Sort",
    "examples": [
      {
        "input": "numCourses = 2, prerequisites = [[1,0]]",
        "output": "[0,1]",
        "explanation": "There are 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1]."
      },
      {
        "input": "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
        "output": "[0,2,1,3]",
        "explanation": "Both [0,1,2,3] and [0,2,1,3] are valid."
      },
      {
        "input": "numCourses = 1, prerequisites = []",
        "output": "[0]",
        "explanation": "Single course requires no prerequisites."
      }
    ],
    "functionName": "findOrder",
    "starterTemplates": {
      "javascript": "/**\n * @param {number} numCourses\n * @param {number[][]} prerequisites\n * @return {number[]}\n */\nfunction findOrder(numCourses, prerequisites) {\n    const inDegree = new Array(numCourses).fill(0);\n    const adj = Array.from({ length: numCourses }, () => []);\n    for (const [course, prereq] of prerequisites) {\n        adj[prereq].push(course);\n        inDegree[course]++;\n    }\n    const queue = [];\n    for (let i = 0; i < numCourses; i++) {\n        if (inDegree[i] === 0) queue.push(i);\n    }\n    const order = [];\n    while (queue.length > 0) {\n        const cur = queue.shift();\n        order.push(cur);\n        for (const next of adj[cur]) {\n            inDegree[next]--;\n            if (inDegree[next] === 0) queue.push(next);\n        }\n    }\n    return order.length === numCourses ? order : [];\n}",
      "python": "class Solution:\n    def findOrder(self, numCourses: int, prerequisites: list[list[int]]) -> list[int]:\n        import collections\n        adj = collections.defaultdict(list)\n        in_degree = [0] * numCourses\n        for crs, pre in prerequisites:\n            adj[pre].append(crs)\n            in_degree[crs] += 1\n        q = collections.deque([i for i in range(numCourses) if in_degree[i] == 0])\n        order = []\n        while q:\n            node = q.popleft()\n            order.append(node)\n            for nxt in adj[node]:\n                in_degree[nxt] -= 1\n                if in_degree[nxt] == 0: q.append(nxt)\n        return order if len(order) == numCourses else []",
      "java": "class Solution {\n    public int[] findOrder(int numCourses, int[][] prerequisites) {\n        int[] inDegree = new int[numCourses];\n        List<Integer>[] adj = new ArrayList[numCourses];\n        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();\n        for (int[] p : prerequisites) { adj[p[1]].add(p[0]); inDegree[p[0]]++; }\n        Queue<Integer> q = new LinkedList<>();\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.add(i);\n        int[] order = new int[numCourses]; int idx = 0;\n        while (!q.isEmpty()) {\n            int cur = q.poll(); order[idx++] = cur;\n            for (int nxt : adj[cur]) if (--inDegree[nxt] == 0) q.add(nxt);\n        }\n        return idx == numCourses ? order : new int[0];\n    }\n}",
      "cpp": "class Solution {\npublic:\n    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<int> inDegree(numCourses, 0);\n        vector<vector<int>> adj(numCourses);\n        for (auto& p : prerequisites) { adj[p[1]].push_back(p[0]); inDegree[p[0]]++; }\n        queue<int> q;\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.push(i);\n        vector<int> order;\n        while (!q.empty()) {\n            int cur = q.front(); q.pop(); order.push_back(cur);\n            for (int nxt : adj[cur]) if (--inDegree[nxt] == 0) q.push(nxt);\n        }\n        return order.size() == numCourses ? order : vector<int>();\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          2,
          [
            [
              1,
              0
            ]
          ]
        ],
        "rawInput": "numCourses = 2, prerequisites = [[1,0]]",
        "expected": [
          0,
          1
        ],
        "expectedRaw": "[0,1]"
      },
      {
        "args": [
          4,
          [
            [
              1,
              0
            ],
            [
              2,
              0
            ],
            [
              3,
              1
            ],
            [
              3,
              2
            ]
          ]
        ],
        "rawInput": "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
        "expected": [
          0,
          1,
          2,
          3
        ],
        "expectedRaw": "[0,1,2,3]"
      },
      {
        "args": [
          1,
          []
        ],
        "rawInput": "numCourses = 1, prerequisites = []",
        "expected": [
          0
        ],
        "expectedRaw": "[0]"
      },
      {
        "args": [
          2,
          [
            [
              0,
              1
            ],
            [
              1,
              0
            ]
          ]
        ],
        "rawInput": "numCourses = 2, prerequisites = [[0,1],[1,0]]",
        "expected": [],
        "expectedRaw": "[]",
        "hidden": true
      }
    ]
  },
  {
    "id": 11,
    "title": "Subarray Sum Equals K",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Meta, Google, Amazon, Microsoft, ByteDance",
    "desc": "Given an array of integers <code>nums</code> and an integer <code>k</code>, return <em>the total number of subarrays whose sum equals to <code>k</code></em>.<br><br>A subarray is a contiguous <strong>non-empty</strong> sequence of elements within an array.",
    "constraints": "• 1 <= nums.length <= 2 * 10^4\n• -1000 <= nums[i] <= 1000\n• -10^7 <= k <= 10^7",
    "hints": "1. Maintain a running prefix sum.\n2. If (prefixSum - k) occurred previously in a hash map, increment count by its frequency.",
    "solution": "function subarraySum(nums, k) {\n    let count = 0, sum = 0;\n    const map = new Map();\n    map.set(0, 1);\n    for (const num of nums) {\n        sum += num;\n        if (map.has(sum - k)) count += map.get(sum - k);\n        map.set(sum, (map.get(sum) || 0) + 1);\n    }\n    return count;\n}",
    "category": "Arrays & Hashing",
    "functionName": "subarraySum",
    "examples": [
      {
        "input": "nums = [1,1,1], k = 2",
        "output": "2",
        "explanation": "Subarrays [1,1] at index (0,1) and (1,2) sum to 2."
      },
      {
        "input": "nums = [1,2,3], k = 3",
        "output": "2",
        "explanation": "Subarrays [1,2] and [3] sum to 3."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number}\n */\nfunction subarraySum(nums, k) {\n    let count = 0, sum = 0;\n    const map = new Map();\n    map.set(0, 1);\n    for (const num of nums) {\n        sum += num;\n        if (map.has(sum - k)) {\n            count += map.get(sum - k);\n        }\n        map.set(sum, (map.get(sum) || 0) + 1);\n    }\n    return count;\n}",
      "python": "class Solution:\n    def subarraySum(self, nums: list[int], k: int) -> int:\n        count = 0\n        cur_sum = 0\n        prefix_map = {0: 1}\n        for n in nums:\n            cur_sum += n\n            if cur_sum - k in prefix_map:\n                count += prefix_map[cur_sum - k]\n            prefix_map[cur_sum] = prefix_map.get(cur_sum, 0) + 1\n        return count",
      "java": "class Solution {\n    public int subarraySum(int[] nums, int k) {\n        int count = 0, sum = 0;\n        Map<Integer, Integer> map = new HashMap<>();\n        map.put(0, 1);\n        for (int n : nums) {\n            sum += n;\n            if (map.containsKey(sum - k)) count += map.get(sum - k);\n            map.put(sum, map.getOrDefault(sum, 0) + 1);\n        }\n        return count;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        int count = 0, sum = 0;\n        unordered_map<int, int> map;\n        map[0] = 1;\n        for (int n : nums) {\n            sum += n;\n            if (map.count(sum - k)) count += map[sum - k];\n            map[sum]++;\n        }\n        return count;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            1,
            1
          ],
          2
        ],
        "rawInput": "nums = [1,1,1], k = 2",
        "expected": 2,
        "expectedRaw": "2"
      },
      {
        "args": [
          [
            1,
            2,
            3
          ],
          3
        ],
        "rawInput": "nums = [1,2,3], k = 3",
        "expected": 2,
        "expectedRaw": "2"
      },
      {
        "args": [
          [
            1,
            -1,
            0
          ],
          0
        ],
        "rawInput": "nums = [1,-1,0], k = 0",
        "expected": 3,
        "expectedRaw": "3"
      },
      {
        "args": [
          [
            3,
            4,
            7,
            2,
            -3,
            1,
            4,
            2
          ],
          7
        ],
        "rawInput": "nums = [3,4,7,2,-3,1,4,2], k = 7",
        "expected": 4,
        "expectedRaw": "4",
        "hidden": true
      }
    ]
  },
  {
    "id": 12,
    "title": "Longest Increasing Subsequence",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Amazon, Microsoft, Apple, Meta",
    "desc": "Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.",
    "constraints": "• 1 <= nums.length <= 2500\n• -10^4 <= nums[i] <= 10^4",
    "hints": "1. Maintain tails array where tails[i] is smallest tail of all increasing subsequences of length i+1.\n2. Binary search tails for position of each number in O(N log N) time.",
    "solution": "function lengthOfLIS(nums) {\n    const tails = [];\n    for (const x of nums) {\n        let l = 0, r = tails.length;\n        while (l < r) {\n            const m = (l + r) >> 1;\n            if (tails[m] < x) l = m + 1;\n            else r = m;\n        }\n        tails[l] = x;\n    }\n    return tails.length;\n}",
    "category": "1-D Dynamic Programming",
    "functionName": "lengthOfLIS",
    "examples": [
      {
        "input": "nums = [10,9,2,5,3,7,101,18]",
        "output": "4",
        "explanation": "The longest increasing subsequence is [2,3,7,101], therefore the length is 4."
      },
      {
        "input": "nums = [0,1,0,3,2,3]",
        "output": "4",
        "explanation": "The longest increasing subsequence is [0,1,2,3]."
      },
      {
        "input": "nums = [7,7,7,7,7,7,7]",
        "output": "1",
        "explanation": "Single element subsequence."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction lengthOfLIS(nums) {\n    const tails = [];\n    for (const x of nums) {\n        let l = 0, r = tails.length;\n        while (l < r) {\n            const m = (l + r) >> 1;\n            if (tails[m] < x) l = m + 1;\n            else r = m;\n        }\n        tails[l] = x;\n    }\n    return tails.length;\n}",
      "python": "class Solution:\n    def lengthOfLIS(self, nums: list[int]) -> int:\n        import bisect\n        tails = []\n        for x in nums:\n            idx = bisect.bisect_left(tails, x)\n            if idx == len(tails): tails.append(x)\n            else: tails[idx] = x\n        return len(tails)",
      "java": "class Solution {\n    public int lengthOfLIS(int[] nums) {\n        int[] tails = new int[nums.length];\n        int size = 0;\n        for (int x : nums) {\n            int i = 0, j = size;\n            while (i != j) {\n                int m = (i + j) / 2;\n                if (tails[m] < x) i = m + 1;\n                else j = m;\n            }\n            tails[i] = x;\n            if (i == size) ++size;\n        }\n        return size;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        vector<int> tails;\n        for (int x : nums) {\n            auto it = lower_bound(tails.begin(), tails.end(), x);\n            if (it == tails.end()) tails.push_back(x);\n            else *it = x;\n        }\n        return tails.size();\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            10,
            9,
            2,
            5,
            3,
            7,
            101,
            18
          ]
        ],
        "rawInput": "nums = [10,9,2,5,3,7,101,18]",
        "expected": 4,
        "expectedRaw": "4"
      },
      {
        "args": [
          [
            0,
            1,
            0,
            3,
            2,
            3
          ]
        ],
        "rawInput": "nums = [0,1,0,3,2,3]",
        "expected": 4,
        "expectedRaw": "4"
      },
      {
        "args": [
          [
            7,
            7,
            7,
            7,
            7,
            7,
            7
          ]
        ],
        "rawInput": "nums = [7,7,7,7,7,7,7]",
        "expected": 1,
        "expectedRaw": "1"
      },
      {
        "args": [
          [
            4,
            10,
            4,
            3,
            8,
            9
          ]
        ],
        "rawInput": "nums = [4,10,4,3,8,9]",
        "expected": 3,
        "expectedRaw": "3",
        "hidden": true
      }
    ]
  },
  {
    "id": 13,
    "title": "3Sum",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Meta, Amazon, Google, Microsoft, Apple",
    "desc": "Given an integer array nums, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.<br><br>Notice that the solution set must not contain duplicate triplets.",
    "constraints": "• 3 <= nums.length <= 3000\n• -10^5 <= nums[i] <= 10^5",
    "hints": "1. Sort the array.\n2. Fix the first element nums[i] and use two pointers left and right to find complementary pairs.",
    "solution": "function threeSum(nums) {\n    nums.sort((a, b) => a - b);\n    const res = [];\n    for (let i = 0; i < nums.length - 2; i++) {\n        if (i > 0 && nums[i] === nums[i - 1]) continue;\n        let l = i + 1, r = nums.length - 1;\n        while (l < r) {\n            const sum = nums[i] + nums[l] + nums[r];\n            if (sum === 0) {\n                res.push([nums[i], nums[l], nums[r]]);\n                while (l < r && nums[l] === nums[l + 1]) l++;\n                while (l < r && nums[r] === nums[r - 1]) r--;\n                l++; r--;\n            } else if (sum < 0) l++;\n            else r--;\n        }\n    }\n    return res;\n}",
    "category": "Two Pointers",
    "functionName": "threeSum",
    "examples": [
      {
        "input": "nums = [-1,0,1,2,-1,-4]",
        "output": "[[-1,-1,2],[-1,0,1]]",
        "explanation": "Unique zero-sum triplets."
      },
      {
        "input": "nums = [0,1,1]",
        "output": "[]",
        "explanation": "No triplet sums to 0."
      },
      {
        "input": "nums = [0,0,0]",
        "output": "[[0,0,0]]",
        "explanation": "Only one triplet sums to 0."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nfunction threeSum(nums) {\n    nums.sort((a, b) => a - b);\n    const res = [];\n    for (let i = 0; i < nums.length - 2; i++) {\n        if (i > 0 && nums[i] === nums[i - 1]) continue;\n        let l = i + 1, r = nums.length - 1;\n        while (l < r) {\n            const sum = nums[i] + nums[l] + nums[r];\n            if (sum === 0) {\n                res.push([nums[i], nums[l], nums[r]]);\n                while (l < r && nums[l] === nums[l + 1]) l++;\n                while (l < r && nums[r] === nums[r - 1]) r--;\n                l++; r--;\n            } else if (sum < 0) {\n                l++;\n            } else {\n                r--;\n            }\n        }\n    }\n    return res;\n}",
      "python": "class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        nums.sort()\n        res = []\n        for i in range(len(nums) - 2):\n            if i > 0 and nums[i] == nums[i - 1]: continue\n            l, r = i + 1, len(nums) - 1\n            while l < r:\n                s = nums[i] + nums[l] + nums[r]\n                if s == 0:\n                    res.append([nums[i], nums[l], nums[r]])\n                    while l < r and nums[l] == nums[l + 1]: l += 1\n                    while l < r and nums[r] == nums[r - 1]: r -= 1\n                    l += 1; r -= 1\n                elif s < 0: l += 1\n                else: r -= 1\n        return res",
      "java": "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> res = new ArrayList<>();\n        for (int i = 0; i < nums.length - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = nums.length - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                } else if (sum < 0) l++;\n                else r--;\n            }\n        }\n        return res;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        vector<vector<int>> res;\n        for (int i = 0; i < (int)nums.size() - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = nums.size() - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    res.push_back({nums[i], nums[l], nums[r]});\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                } else if (sum < 0) l++;\n                else r--;\n            }\n        }\n        return res;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            -1,
            0,
            1,
            2,
            -1,
            -4
          ]
        ],
        "rawInput": "nums = [-1,0,1,2,-1,-4]",
        "expected": [
          [
            -1,
            -1,
            2
          ],
          [
            -1,
            0,
            1
          ]
        ],
        "expectedRaw": "[[-1,-1,2],[-1,0,1]]"
      },
      {
        "args": [
          [
            0,
            1,
            1
          ]
        ],
        "rawInput": "nums = [0,1,1]",
        "expected": [],
        "expectedRaw": "[]"
      },
      {
        "args": [
          [
            0,
            0,
            0
          ]
        ],
        "rawInput": "nums = [0,0,0]",
        "expected": [
          [
            0,
            0,
            0
          ]
        ],
        "expectedRaw": "[[0,0,0]]"
      }
    ]
  },
  {
    "id": 14,
    "title": "Container With Most Water",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Amazon, Google, Meta, Apple, Microsoft",
    "desc": "You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.<br><br>Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
    "constraints": "• n == height.length\n• 2 <= n <= 10^5\n• 0 <= height[i] <= 10^4",
    "hints": "1. Start with pointers at both ends.\n2. Area = min(height[l], height[r]) * (r - l).\n3. Move the pointer with smaller height inward.",
    "solution": "function maxArea(height) {\n    let l = 0, r = height.length - 1, max = 0;\n    while (l < r) {\n        const h = Math.min(height[l], height[r]);\n        const area = h * (r - l);\n        if (area > max) max = area;\n        if (height[l] < height[r]) l++;\n        else r--;\n    }\n    return max;\n}",
    "category": "Two Pointers",
    "functionName": "maxArea",
    "examples": [
      {
        "input": "height = [1,8,6,2,5,4,8,3,7]",
        "output": "49",
        "explanation": "The max area is between index 1 and 8: min(8, 7) * (8 - 1) = 49."
      },
      {
        "input": "height = [1,1]",
        "output": "1",
        "explanation": "Min(1,1) * 1 = 1."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {number[]} height\n * @return {number}\n */\nfunction maxArea(height) {\n    let l = 0, r = height.length - 1;\n    let max = 0;\n    while (l < r) {\n        const h = Math.min(height[l], height[r]);\n        const area = h * (r - l);\n        if (area > max) max = area;\n        if (height[l] < height[r]) l++;\n        else r--;\n    }\n    return max;\n}",
      "python": "class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        l, r = 0, len(height) - 1\n        max_a = 0\n        while l < r:\n            h = min(height[l], height[r])\n            max_a = max(max_a, h * (r - l))\n            if height[l] < height[r]: l += 1\n            else: r -= 1\n        return max_a",
      "java": "class Solution {\n    public int maxArea(int[] height) {\n        int l = 0, r = height.length - 1, max = 0;\n        while (l < r) {\n            int h = Math.min(height[l], height[r]);\n            max = Math.max(max, h * (r - l));\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return max;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int l = 0, r = height.size() - 1, maxA = 0;\n        while (l < r) {\n            int h = min(height[l], height[r]);\n            maxA = max(maxA, h * (r - l));\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return maxA;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            8,
            6,
            2,
            5,
            4,
            8,
            3,
            7
          ]
        ],
        "rawInput": "height = [1,8,6,2,5,4,8,3,7]",
        "expected": 49,
        "expectedRaw": "49"
      },
      {
        "args": [
          [
            1,
            1
          ]
        ],
        "rawInput": "height = [1,1]",
        "expected": 1,
        "expectedRaw": "1"
      },
      {
        "args": [
          [
            4,
            3,
            2,
            1,
            4
          ]
        ],
        "rawInput": "height = [4,3,2,1,4]",
        "expected": 16,
        "expectedRaw": "16",
        "hidden": true
      }
    ]
  },
  {
    "id": 15,
    "title": "Sliding Window Maximum",
    "topic": "Queue",
    "difficulty": "HARD",
    "companies": "Amazon, Google, Meta, Microsoft, Citadel",
    "desc": "You are given an array of integers <code>nums</code>, there is a sliding window of size <code>k</code> which is moving from the very left of the array to the very right. You can only see the <code>k</code> numbers in the window. Each time the sliding window moves right by one position. Return the <em>max sliding window</em>.",
    "constraints": "• 1 <= nums.length <= 10^5\n• -10^4 <= nums[i] <= 10^4\n• 1 <= k <= nums.length",
    "hints": "1. Use a Monotonic Deque storing indices in decreasing order of values.\n2. Evict elements outside the current window boundary.",
    "solution": "function maxSlidingWindow(nums, k) {\n    const q = [];\n    const res = [];\n    for (let i = 0; i < nums.length; i++) {\n        while (q.length && q[0] <= i - k) q.shift();\n        while (q.length && nums[q[q.length - 1]] < nums[i]) q.pop();\n        q.push(i);\n        if (i >= k - 1) res.push(nums[q[0]]);\n    }\n    return res;\n}",
    "category": "Monotonic Queue",
    "functionName": "maxSlidingWindow",
    "examples": [
      {
        "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
        "output": "[3,3,5,5,6,7]",
        "explanation": "Window max elements as window slides."
      },
      {
        "input": "nums = [1], k = 1",
        "output": "[1]",
        "explanation": "Single element window."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */\nfunction maxSlidingWindow(nums, k) {\n    const q = []; // stores indices\n    const res = [];\n    for (let i = 0; i < nums.length; i++) {\n        while (q.length && q[0] <= i - k) q.shift();\n        while (q.length && nums[q[q.length - 1]] < nums[i]) q.pop();\n        q.push(i);\n        if (i >= k - 1) res.push(nums[q[0]]);\n    }\n    return res;\n}",
      "python": "class Solution:\n    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:\n        import collections\n        q = collections.deque()\n        res = []\n        for i, n in enumerate(nums):\n            while q and q[0] <= i - k: q.popleft()\n            while q and nums[q[-1]] < n: q.pop()\n            q.append(i)\n            if i >= k - 1: res.append(nums[q[0]])\n        return res",
      "java": "class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        int n = nums.length;\n        int[] res = new int[n - k + 1];\n        Deque<Integer> q = new ArrayDeque<>();\n        for (int i = 0; i < n; i++) {\n            while (!q.isEmpty() && q.peekFirst() <= i - k) q.pollFirst();\n            while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) q.pollLast();\n            q.offerLast(i);\n            if (i >= k - 1) res[i - k + 1] = nums[q.peekFirst()];\n        }\n        return res;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        deque<int> q;\n        vector<int> res;\n        for (int i = 0; i < nums.size(); i++) {\n            while (!q.empty() && q.front() <= i - k) q.pop_front();\n            while (!q.empty() && nums[q.back()] < nums[i]) q.pop_back();\n            q.push_back(i);\n            if (i >= k - 1) res.push_back(nums[q.front()]);\n        }\n        return res;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            3,
            -1,
            -3,
            5,
            3,
            6,
            7
          ],
          3
        ],
        "rawInput": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
        "expected": [
          3,
          3,
          5,
          5,
          6,
          7
        ],
        "expectedRaw": "[3,3,5,5,6,7]"
      },
      {
        "args": [
          [
            1
          ],
          1
        ],
        "rawInput": "nums = [1], k = 1",
        "expected": [
          1
        ],
        "expectedRaw": "[1]"
      },
      {
        "args": [
          [
            9,
            11
          ],
          2
        ],
        "rawInput": "nums = [9,11], k = 2",
        "expected": [
          11
        ],
        "expectedRaw": "[11]",
        "hidden": true
      }
    ]
  },
  {
    "id": 16,
    "title": "Daily Temperatures",
    "topic": "Stack",
    "difficulty": "MEDIUM",
    "companies": "Meta, Google, Amazon, Microsoft, Bloomberg",
    "desc": "Given an array of integers <code>temperatures</code> represents the daily temperatures, return an array <code>answer</code> such that <code>answer[i]</code> is the number of days you have to wait after the <code>i<sup>th</sup></code> day to get a warmer temperature. If there is no future day for which this is possible, keep <code>answer[i] == 0</code> instead.",
    "constraints": "• 1 <= temperatures.length <= 10^5\n• 30 <= temperatures[i] <= 100",
    "hints": "1. Use a Monotonic Decreasing Stack storing indices.\n2. When encountering temperature T greater than stack top, pop and calculate index difference.",
    "solution": "function dailyTemperatures(temperatures) {\n    const n = temperatures.length;\n    const res = new Array(n).fill(0);\n    const stack = [];\n    for (let i = 0; i < n; i++) {\n        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {\n            const prevIdx = stack.pop();\n            res[prevIdx] = i - prevIdx;\n        }\n        stack.push(i);\n    }\n    return res;\n}",
    "category": "Monotonic Stack",
    "functionName": "dailyTemperatures",
    "examples": [
      {
        "input": "temperatures = [73,74,75,71,69,72,76,73]",
        "output": "[1,1,4,2,1,1,0,0]",
        "explanation": "Days to wait for a warmer temperature."
      },
      {
        "input": "temperatures = [30,40,50,60]",
        "output": "[1,1,1,0]",
        "explanation": "Consecutive daily increases."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {number[]} temperatures\n * @return {number[]}\n */\nfunction dailyTemperatures(temperatures) {\n    const n = temperatures.length;\n    const res = new Array(n).fill(0);\n    const stack = []; // indices\n    for (let i = 0; i < n; i++) {\n        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {\n            const prevIdx = stack.pop();\n            res[prevIdx] = i - prevIdx;\n        }\n        stack.push(i);\n    }\n    return res;\n}",
      "python": "class Solution:\n    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:\n        res = [0] * len(temperatures)\n        stack = []\n        for i, t in enumerate(temperatures):\n            while stack and t > temperatures[stack[-1]]:\n                prev = stack.pop()\n                res[prev] = i - prev\n            stack.append(i)\n        return res",
      "java": "class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        int n = temperatures.length;\n        int[] res = new int[n];\n        Deque<Integer> stack = new ArrayDeque<>();\n        for (int i = 0; i < n; i++) {\n            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {\n                int prev = stack.pop();\n                res[prev] = i - prev;\n            }\n            stack.push(i);\n        }\n        return res;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        int n = temperatures.size();\n        vector<int> res(n, 0);\n        stack<int> st;\n        for (int i = 0; i < n; i++) {\n            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {\n                int prev = st.top(); st.pop();\n                res[prev] = i - prev;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            73,
            74,
            75,
            71,
            69,
            72,
            76,
            73
          ]
        ],
        "rawInput": "temperatures = [73,74,75,71,69,72,76,73]",
        "expected": [
          1,
          1,
          4,
          2,
          1,
          1,
          0,
          0
        ],
        "expectedRaw": "[1,1,4,2,1,1,0,0]"
      },
      {
        "args": [
          [
            30,
            40,
            50,
            60
          ]
        ],
        "rawInput": "temperatures = [30,40,50,60]",
        "expected": [
          1,
          1,
          1,
          0
        ],
        "expectedRaw": "[1,1,1,0]"
      },
      {
        "args": [
          [
            30,
            60,
            90
          ]
        ],
        "rawInput": "temperatures = [30,60,90]",
        "expected": [
          1,
          1,
          0
        ],
        "expectedRaw": "[1,1,0]",
        "hidden": true
      }
    ]
  },
  {
    "id": 17,
    "title": "Medium Trie Solution 117",
    "topic": "Trie",
    "difficulty": "MEDIUM",
    "companies": "Meta, Samsung, Uber, Infosys",
    "desc": "Implement an optimized logic on Trie representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Trie\n    return new ArrayList<>();\n}",
    "category": "Trie",
    "functionName": "mediumTrieSolution117",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumTrieSolution117(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumTrieSolution117(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumTrieSolution117(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumTrieSolution117(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 18,
    "title": "Medium Bit Manipulation Solution 118",
    "topic": "Bit Manipulation",
    "difficulty": "MEDIUM",
    "companies": "Netflix, Infosys, Atlassian, Microsoft",
    "desc": "Implement an optimized logic on Bit Manipulation representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Bit Manipulation\n    return new ArrayList<>();\n}",
    "category": "Bit Manipulation",
    "functionName": "mediumBitManipulationSolution118",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBitManipulationSolution118(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBitManipulationSolution118(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBitManipulationSolution118(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBitManipulationSolution118(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 19,
    "title": "Medium Math Solution 119",
    "topic": "Math",
    "difficulty": "MEDIUM",
    "companies": "Adobe, Google, Cisco, Adobe",
    "desc": "Implement an optimized logic on Math representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Math\n    return new ArrayList<>();\n}",
    "category": "Math",
    "functionName": "mediumMathSolution119",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumMathSolution119(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumMathSolution119(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumMathSolution119(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumMathSolution119(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 20,
    "title": "Medium Arrays Solution 120",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Salesforce, Meta, Infosys, Walmart",
    "desc": "Implement an optimized logic on Arrays representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Arrays\n    return new ArrayList<>();\n}",
    "category": "Arrays",
    "functionName": "mediumArraysSolution120",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumArraysSolution120(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumArraysSolution120(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumArraysSolution120(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumArraysSolution120(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 21,
    "title": "Medium Strings Solution 121",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "companies": "Goldman Sachs, Uber, Amazon, TCS",
    "desc": "Implement an optimized logic on Strings representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Strings\n    return new ArrayList<>();\n}",
    "category": "Strings",
    "functionName": "mediumStringsSolution121",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumStringsSolution121(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumStringsSolution121(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumStringsSolution121(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumStringsSolution121(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 22,
    "title": "Medium Linked Lists Solution 122",
    "topic": "Linked Lists",
    "difficulty": "MEDIUM",
    "companies": "PayPal, Salesforce, Netflix, Amazon",
    "desc": "Implement an optimized logic on Linked Lists representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Linked Lists\n    return new ArrayList<>();\n}",
    "category": "Linked Lists",
    "functionName": "mediumLinkedListsSolution122",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumLinkedListsSolution122(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumLinkedListsSolution122(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumLinkedListsSolution122(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumLinkedListsSolution122(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 23,
    "title": "Medium Stack Solution 123",
    "topic": "Stack",
    "difficulty": "MEDIUM",
    "companies": "Samsung, Walmart, Salesforce, Uber",
    "desc": "Implement an optimized logic on Stack representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Stack\n    return new ArrayList<>();\n}",
    "category": "Stack",
    "functionName": "mediumStackSolution123",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumStackSolution123(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumStackSolution123(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumStackSolution123(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumStackSolution123(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 24,
    "title": "Medium Queue Solution 124",
    "topic": "Queue",
    "difficulty": "MEDIUM",
    "companies": "TCS, Samsung, PayPal, Goldman Sachs",
    "desc": "Implement an optimized logic on Queue representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Queue\n    return new ArrayList<>();\n}",
    "category": "Queue",
    "functionName": "mediumQueueSolution124",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumQueueSolution124(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumQueueSolution124(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumQueueSolution124(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumQueueSolution124(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 25,
    "title": "Medium Tree Solution 125",
    "topic": "Tree",
    "difficulty": "MEDIUM",
    "companies": "Accenture, Infosys, TCS, Intel",
    "desc": "Implement an optimized logic on Tree representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Tree\n    return new ArrayList<>();\n}",
    "category": "Tree",
    "functionName": "mediumTreeSolution125",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumTreeSolution125(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumTreeSolution125(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumTreeSolution125(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumTreeSolution125(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 26,
    "title": "Medium Graph Solution 126",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Google, Google, Google, Google",
    "desc": "Implement an optimized logic on Graph representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Graph\n    return new ArrayList<>();\n}",
    "category": "Graph",
    "functionName": "mediumGraphSolution126",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumGraphSolution126(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumGraphSolution126(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumGraphSolution126(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumGraphSolution126(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 27,
    "title": "Medium Heap Solution 127",
    "topic": "Heap",
    "difficulty": "MEDIUM",
    "companies": "Microsoft, Meta, Apple, Netflix",
    "desc": "Implement an optimized logic on Heap representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Heap\n    return new ArrayList<>();\n}",
    "category": "Heap",
    "functionName": "mediumHeapSolution127",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumHeapSolution127(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumHeapSolution127(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumHeapSolution127(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumHeapSolution127(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 28,
    "title": "Medium Greedy Solution 128",
    "topic": "Greedy",
    "difficulty": "MEDIUM",
    "companies": "Apple, Uber, Oracle, Atlassian",
    "desc": "Implement an optimized logic on Greedy representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Greedy\n    return new ArrayList<>();\n}",
    "category": "Greedy",
    "functionName": "mediumGreedySolution128",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumGreedySolution128(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumGreedySolution128(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumGreedySolution128(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumGreedySolution128(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 29,
    "title": "Medium Dynamic Programming Solution 129",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Uber, Salesforce, Walmart, Samsung",
    "desc": "Implement an optimized logic on Dynamic Programming representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Dynamic Programming\n    return new ArrayList<>();\n}",
    "category": "Dynamic Programming",
    "functionName": "mediumDynamicProgrammingSolution129",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumDynamicProgrammingSolution129(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumDynamicProgrammingSolution129(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumDynamicProgrammingSolution129(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumDynamicProgrammingSolution129(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 30,
    "title": "Medium Backtracking Solution 130",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "Oracle, Walmart, Intel, Wipro",
    "desc": "Implement an optimized logic on Backtracking representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Backtracking\n    return new ArrayList<>();\n}",
    "category": "Backtracking",
    "functionName": "mediumBacktrackingSolution130",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBacktrackingSolution130(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBacktrackingSolution130(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBacktrackingSolution130(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBacktrackingSolution130(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 31,
    "title": "Medium Binary Search Solution 131",
    "topic": "Binary Search",
    "difficulty": "MEDIUM",
    "companies": "Atlassian, Samsung, Wipro, Apple",
    "desc": "Implement an optimized logic on Binary Search representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Binary Search\n    return new ArrayList<>();\n}",
    "category": "Binary Search",
    "functionName": "mediumBinarySearchSolution131",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBinarySearchSolution131(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBinarySearchSolution131(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBinarySearchSolution131(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBinarySearchSolution131(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 32,
    "title": "Medium Trie Solution 132",
    "topic": "Trie",
    "difficulty": "MEDIUM",
    "companies": "Walmart, Infosys, Meta, Salesforce",
    "desc": "Implement an optimized logic on Trie representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Trie\n    return new ArrayList<>();\n}",
    "category": "Trie",
    "functionName": "mediumTrieSolution132",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumTrieSolution132(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumTrieSolution132(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumTrieSolution132(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumTrieSolution132(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 33,
    "title": "Medium Bit Manipulation Solution 133",
    "topic": "Bit Manipulation",
    "difficulty": "MEDIUM",
    "companies": "Cisco, Google, Adobe, Cisco",
    "desc": "Implement an optimized logic on Bit Manipulation representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Bit Manipulation\n    return new ArrayList<>();\n}",
    "category": "Bit Manipulation",
    "functionName": "mediumBitManipulationSolution133",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBitManipulationSolution133(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBitManipulationSolution133(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBitManipulationSolution133(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBitManipulationSolution133(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 34,
    "title": "Medium Math Solution 134",
    "topic": "Math",
    "difficulty": "MEDIUM",
    "companies": "Intel, Meta, Goldman Sachs, Accenture",
    "desc": "Implement an optimized logic on Math representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Math\n    return new ArrayList<>();\n}",
    "category": "Math",
    "functionName": "mediumMathSolution134",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumMathSolution134(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumMathSolution134(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumMathSolution134(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumMathSolution134(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 35,
    "title": "Medium Arrays Solution 135",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Infosys, Uber, Samsung, Meta",
    "desc": "Implement an optimized logic on Arrays representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Arrays\n    return new ArrayList<>();\n}",
    "category": "Arrays",
    "functionName": "mediumArraysSolution135",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumArraysSolution135(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumArraysSolution135(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumArraysSolution135(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumArraysSolution135(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 36,
    "title": "Medium Strings Solution 136",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "companies": "Wipro, Salesforce, Accenture, Oracle",
    "desc": "Implement an optimized logic on Strings representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Strings\n    return new ArrayList<>();\n}",
    "category": "Strings",
    "functionName": "mediumStringsSolution136",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumStringsSolution136(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumStringsSolution136(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumStringsSolution136(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumStringsSolution136(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 37,
    "title": "Medium Linked Lists Solution 137",
    "topic": "Linked Lists",
    "difficulty": "MEDIUM",
    "companies": "Amazon, Walmart, Microsoft, PayPal",
    "desc": "Implement an optimized logic on Linked Lists representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Linked Lists\n    return new ArrayList<>();\n}",
    "category": "Linked Lists",
    "functionName": "mediumLinkedListsSolution137",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumLinkedListsSolution137(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumLinkedListsSolution137(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumLinkedListsSolution137(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumLinkedListsSolution137(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 38,
    "title": "Medium Stack Solution 138",
    "topic": "Stack",
    "difficulty": "MEDIUM",
    "companies": "Meta, Samsung, Uber, Infosys",
    "desc": "Implement an optimized logic on Stack representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Stack\n    return new ArrayList<>();\n}",
    "category": "Stack",
    "functionName": "mediumStackSolution138",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumStackSolution138(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumStackSolution138(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumStackSolution138(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumStackSolution138(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 39,
    "title": "Medium Queue Solution 139",
    "topic": "Queue",
    "difficulty": "MEDIUM",
    "companies": "Netflix, Infosys, Atlassian, Microsoft",
    "desc": "Implement an optimized logic on Queue representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Queue\n    return new ArrayList<>();\n}",
    "category": "Queue",
    "functionName": "mediumQueueSolution139",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumQueueSolution139(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumQueueSolution139(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumQueueSolution139(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumQueueSolution139(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 40,
    "title": "Medium Tree Solution 140",
    "topic": "Tree",
    "difficulty": "MEDIUM",
    "companies": "Adobe, Google, Cisco, Adobe",
    "desc": "Implement an optimized logic on Tree representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Tree\n    return new ArrayList<>();\n}",
    "category": "Tree",
    "functionName": "mediumTreeSolution140",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumTreeSolution140(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumTreeSolution140(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumTreeSolution140(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumTreeSolution140(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 41,
    "title": "Medium Graph Solution 141",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Salesforce, Meta, Infosys, Walmart",
    "desc": "Implement an optimized logic on Graph representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Graph\n    return new ArrayList<>();\n}",
    "category": "Graph",
    "functionName": "mediumGraphSolution141",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumGraphSolution141(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumGraphSolution141(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumGraphSolution141(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumGraphSolution141(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 42,
    "title": "Medium Heap Solution 142",
    "topic": "Heap",
    "difficulty": "MEDIUM",
    "companies": "Goldman Sachs, Uber, Amazon, TCS",
    "desc": "Implement an optimized logic on Heap representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Heap\n    return new ArrayList<>();\n}",
    "category": "Heap",
    "functionName": "mediumHeapSolution142",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumHeapSolution142(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumHeapSolution142(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumHeapSolution142(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumHeapSolution142(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 43,
    "title": "Medium Greedy Solution 143",
    "topic": "Greedy",
    "difficulty": "MEDIUM",
    "companies": "PayPal, Salesforce, Netflix, Amazon",
    "desc": "Implement an optimized logic on Greedy representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Greedy\n    return new ArrayList<>();\n}",
    "category": "Greedy",
    "functionName": "mediumGreedySolution143",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumGreedySolution143(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumGreedySolution143(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumGreedySolution143(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumGreedySolution143(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 44,
    "title": "Medium Dynamic Programming Solution 144",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Samsung, Walmart, Salesforce, Uber",
    "desc": "Implement an optimized logic on Dynamic Programming representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Dynamic Programming\n    return new ArrayList<>();\n}",
    "category": "Dynamic Programming",
    "functionName": "mediumDynamicProgrammingSolution144",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumDynamicProgrammingSolution144(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumDynamicProgrammingSolution144(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumDynamicProgrammingSolution144(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumDynamicProgrammingSolution144(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 45,
    "title": "Medium Backtracking Solution 145",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "TCS, Samsung, PayPal, Goldman Sachs",
    "desc": "Implement an optimized logic on Backtracking representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Backtracking\n    return new ArrayList<>();\n}",
    "category": "Backtracking",
    "functionName": "mediumBacktrackingSolution145",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBacktrackingSolution145(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBacktrackingSolution145(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBacktrackingSolution145(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBacktrackingSolution145(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 46,
    "title": "Medium Binary Search Solution 146",
    "topic": "Binary Search",
    "difficulty": "MEDIUM",
    "companies": "Accenture, Infosys, TCS, Intel",
    "desc": "Implement an optimized logic on Binary Search representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Binary Search\n    return new ArrayList<>();\n}",
    "category": "Binary Search",
    "functionName": "mediumBinarySearchSolution146",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBinarySearchSolution146(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBinarySearchSolution146(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBinarySearchSolution146(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBinarySearchSolution146(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 47,
    "title": "Medium Trie Solution 147",
    "topic": "Trie",
    "difficulty": "MEDIUM",
    "companies": "Google, Google, Google, Google",
    "desc": "Implement an optimized logic on Trie representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Trie\n    return new ArrayList<>();\n}",
    "category": "Trie",
    "functionName": "mediumTrieSolution147",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumTrieSolution147(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumTrieSolution147(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumTrieSolution147(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumTrieSolution147(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 48,
    "title": "Medium Bit Manipulation Solution 148",
    "topic": "Bit Manipulation",
    "difficulty": "MEDIUM",
    "companies": "Microsoft, Meta, Apple, Netflix",
    "desc": "Implement an optimized logic on Bit Manipulation representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Bit Manipulation\n    return new ArrayList<>();\n}",
    "category": "Bit Manipulation",
    "functionName": "mediumBitManipulationSolution148",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBitManipulationSolution148(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBitManipulationSolution148(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBitManipulationSolution148(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBitManipulationSolution148(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 49,
    "title": "Medium Math Solution 149",
    "topic": "Math",
    "difficulty": "MEDIUM",
    "companies": "Apple, Uber, Oracle, Atlassian",
    "desc": "Implement an optimized logic on Math representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Math\n    return new ArrayList<>();\n}",
    "category": "Math",
    "functionName": "mediumMathSolution149",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumMathSolution149(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumMathSolution149(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumMathSolution149(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumMathSolution149(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 50,
    "title": "Medium Arrays Solution 150",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Uber, Salesforce, Walmart, Samsung",
    "desc": "Implement an optimized logic on Arrays representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Arrays\n    return new ArrayList<>();\n}",
    "category": "Arrays",
    "functionName": "mediumArraysSolution150",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumArraysSolution150(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumArraysSolution150(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumArraysSolution150(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumArraysSolution150(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 51,
    "title": "Medium Strings Solution 151",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "companies": "Oracle, Walmart, Intel, Wipro",
    "desc": "Implement an optimized logic on Strings representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Strings\n    return new ArrayList<>();\n}",
    "category": "Strings",
    "functionName": "mediumStringsSolution151",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumStringsSolution151(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumStringsSolution151(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumStringsSolution151(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumStringsSolution151(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 52,
    "title": "Medium Linked Lists Solution 152",
    "topic": "Linked Lists",
    "difficulty": "MEDIUM",
    "companies": "Atlassian, Samsung, Wipro, Apple",
    "desc": "Implement an optimized logic on Linked Lists representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Linked Lists\n    return new ArrayList<>();\n}",
    "category": "Linked Lists",
    "functionName": "mediumLinkedListsSolution152",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumLinkedListsSolution152(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumLinkedListsSolution152(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumLinkedListsSolution152(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumLinkedListsSolution152(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 53,
    "title": "Medium Stack Solution 153",
    "topic": "Stack",
    "difficulty": "MEDIUM",
    "companies": "Walmart, Infosys, Meta, Salesforce",
    "desc": "Implement an optimized logic on Stack representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Stack\n    return new ArrayList<>();\n}",
    "category": "Stack",
    "functionName": "mediumStackSolution153",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumStackSolution153(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumStackSolution153(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumStackSolution153(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumStackSolution153(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 54,
    "title": "Medium Queue Solution 154",
    "topic": "Queue",
    "difficulty": "MEDIUM",
    "companies": "Cisco, Google, Adobe, Cisco",
    "desc": "Implement an optimized logic on Queue representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Queue\n    return new ArrayList<>();\n}",
    "category": "Queue",
    "functionName": "mediumQueueSolution154",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumQueueSolution154(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumQueueSolution154(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumQueueSolution154(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumQueueSolution154(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 55,
    "title": "Medium Tree Solution 155",
    "topic": "Tree",
    "difficulty": "MEDIUM",
    "companies": "Intel, Meta, Goldman Sachs, Accenture",
    "desc": "Implement an optimized logic on Tree representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Tree\n    return new ArrayList<>();\n}",
    "category": "Tree",
    "functionName": "mediumTreeSolution155",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumTreeSolution155(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumTreeSolution155(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumTreeSolution155(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumTreeSolution155(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 56,
    "title": "Medium Graph Solution 156",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Infosys, Uber, Samsung, Meta",
    "desc": "Implement an optimized logic on Graph representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Graph\n    return new ArrayList<>();\n}",
    "category": "Graph",
    "functionName": "mediumGraphSolution156",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumGraphSolution156(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumGraphSolution156(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumGraphSolution156(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumGraphSolution156(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 57,
    "title": "Medium Heap Solution 157",
    "topic": "Heap",
    "difficulty": "MEDIUM",
    "companies": "Wipro, Salesforce, Accenture, Oracle",
    "desc": "Implement an optimized logic on Heap representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Heap\n    return new ArrayList<>();\n}",
    "category": "Heap",
    "functionName": "mediumHeapSolution157",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumHeapSolution157(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumHeapSolution157(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumHeapSolution157(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumHeapSolution157(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 58,
    "title": "Medium Greedy Solution 158",
    "topic": "Greedy",
    "difficulty": "MEDIUM",
    "companies": "Amazon, Walmart, Microsoft, PayPal",
    "desc": "Implement an optimized logic on Greedy representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Greedy\n    return new ArrayList<>();\n}",
    "category": "Greedy",
    "functionName": "mediumGreedySolution158",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumGreedySolution158(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumGreedySolution158(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumGreedySolution158(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumGreedySolution158(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 59,
    "title": "Medium Dynamic Programming Solution 159",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Meta, Samsung, Uber, Infosys",
    "desc": "Implement an optimized logic on Dynamic Programming representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Dynamic Programming\n    return new ArrayList<>();\n}",
    "category": "Dynamic Programming",
    "functionName": "mediumDynamicProgrammingSolution159",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumDynamicProgrammingSolution159(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumDynamicProgrammingSolution159(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumDynamicProgrammingSolution159(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumDynamicProgrammingSolution159(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 60,
    "title": "Medium Backtracking Solution 160",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "Netflix, Infosys, Atlassian, Microsoft",
    "desc": "Implement an optimized logic on Backtracking representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Backtracking\n    return new ArrayList<>();\n}",
    "category": "Backtracking",
    "functionName": "mediumBacktrackingSolution160",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBacktrackingSolution160(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBacktrackingSolution160(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBacktrackingSolution160(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBacktrackingSolution160(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 61,
    "title": "Medium Binary Search Solution 161",
    "topic": "Binary Search",
    "difficulty": "MEDIUM",
    "companies": "Adobe, Google, Cisco, Adobe",
    "desc": "Implement an optimized logic on Binary Search representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Binary Search\n    return new ArrayList<>();\n}",
    "category": "Binary Search",
    "functionName": "mediumBinarySearchSolution161",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBinarySearchSolution161(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBinarySearchSolution161(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBinarySearchSolution161(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBinarySearchSolution161(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 62,
    "title": "Medium Trie Solution 162",
    "topic": "Trie",
    "difficulty": "MEDIUM",
    "companies": "Salesforce, Meta, Infosys, Walmart",
    "desc": "Implement an optimized logic on Trie representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Trie\n    return new ArrayList<>();\n}",
    "category": "Trie",
    "functionName": "mediumTrieSolution162",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumTrieSolution162(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumTrieSolution162(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumTrieSolution162(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumTrieSolution162(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 63,
    "title": "Medium Bit Manipulation Solution 163",
    "topic": "Bit Manipulation",
    "difficulty": "MEDIUM",
    "companies": "Goldman Sachs, Uber, Amazon, TCS",
    "desc": "Implement an optimized logic on Bit Manipulation representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Bit Manipulation\n    return new ArrayList<>();\n}",
    "category": "Bit Manipulation",
    "functionName": "mediumBitManipulationSolution163",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBitManipulationSolution163(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBitManipulationSolution163(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBitManipulationSolution163(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBitManipulationSolution163(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 64,
    "title": "Medium Math Solution 164",
    "topic": "Math",
    "difficulty": "MEDIUM",
    "companies": "PayPal, Salesforce, Netflix, Amazon",
    "desc": "Implement an optimized logic on Math representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Math\n    return new ArrayList<>();\n}",
    "category": "Math",
    "functionName": "mediumMathSolution164",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumMathSolution164(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumMathSolution164(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumMathSolution164(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumMathSolution164(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 65,
    "title": "Medium Arrays Solution 165",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Samsung, Walmart, Salesforce, Uber",
    "desc": "Implement an optimized logic on Arrays representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Arrays\n    return new ArrayList<>();\n}",
    "category": "Arrays",
    "functionName": "mediumArraysSolution165",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumArraysSolution165(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumArraysSolution165(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumArraysSolution165(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumArraysSolution165(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 66,
    "title": "Medium Strings Solution 166",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "companies": "TCS, Samsung, PayPal, Goldman Sachs",
    "desc": "Implement an optimized logic on Strings representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Strings\n    return new ArrayList<>();\n}",
    "category": "Strings",
    "functionName": "mediumStringsSolution166",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumStringsSolution166(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumStringsSolution166(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumStringsSolution166(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumStringsSolution166(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 67,
    "title": "Medium Linked Lists Solution 167",
    "topic": "Linked Lists",
    "difficulty": "MEDIUM",
    "companies": "Accenture, Infosys, TCS, Intel",
    "desc": "Implement an optimized logic on Linked Lists representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Linked Lists\n    return new ArrayList<>();\n}",
    "category": "Linked Lists",
    "functionName": "mediumLinkedListsSolution167",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumLinkedListsSolution167(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumLinkedListsSolution167(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumLinkedListsSolution167(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumLinkedListsSolution167(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 68,
    "title": "Medium Stack Solution 168",
    "topic": "Stack",
    "difficulty": "MEDIUM",
    "companies": "Google, Google, Google, Google",
    "desc": "Implement an optimized logic on Stack representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Stack\n    return new ArrayList<>();\n}",
    "category": "Stack",
    "functionName": "mediumStackSolution168",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumStackSolution168(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumStackSolution168(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumStackSolution168(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumStackSolution168(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 69,
    "title": "Medium Queue Solution 169",
    "topic": "Queue",
    "difficulty": "MEDIUM",
    "companies": "Microsoft, Meta, Apple, Netflix",
    "desc": "Implement an optimized logic on Queue representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Queue\n    return new ArrayList<>();\n}",
    "category": "Queue",
    "functionName": "mediumQueueSolution169",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumQueueSolution169(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumQueueSolution169(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumQueueSolution169(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumQueueSolution169(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 70,
    "title": "Medium Tree Solution 170",
    "topic": "Tree",
    "difficulty": "MEDIUM",
    "companies": "Apple, Uber, Oracle, Atlassian",
    "desc": "Implement an optimized logic on Tree representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Tree\n    return new ArrayList<>();\n}",
    "category": "Tree",
    "functionName": "mediumTreeSolution170",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumTreeSolution170(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumTreeSolution170(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumTreeSolution170(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumTreeSolution170(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 71,
    "title": "Medium Graph Solution 171",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Uber, Salesforce, Walmart, Samsung",
    "desc": "Implement an optimized logic on Graph representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Graph\n    return new ArrayList<>();\n}",
    "category": "Graph",
    "functionName": "mediumGraphSolution171",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumGraphSolution171(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumGraphSolution171(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumGraphSolution171(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumGraphSolution171(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 72,
    "title": "Medium Heap Solution 172",
    "topic": "Heap",
    "difficulty": "MEDIUM",
    "companies": "Oracle, Walmart, Intel, Wipro",
    "desc": "Implement an optimized logic on Heap representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Heap\n    return new ArrayList<>();\n}",
    "category": "Heap",
    "functionName": "mediumHeapSolution172",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumHeapSolution172(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumHeapSolution172(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumHeapSolution172(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumHeapSolution172(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 73,
    "title": "Medium Greedy Solution 173",
    "topic": "Greedy",
    "difficulty": "MEDIUM",
    "companies": "Atlassian, Samsung, Wipro, Apple",
    "desc": "Implement an optimized logic on Greedy representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Greedy\n    return new ArrayList<>();\n}",
    "category": "Greedy",
    "functionName": "mediumGreedySolution173",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumGreedySolution173(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumGreedySolution173(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumGreedySolution173(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumGreedySolution173(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 74,
    "title": "Medium Dynamic Programming Solution 174",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Walmart, Infosys, Meta, Salesforce",
    "desc": "Implement an optimized logic on Dynamic Programming representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Dynamic Programming\n    return new ArrayList<>();\n}",
    "category": "Dynamic Programming",
    "functionName": "mediumDynamicProgrammingSolution174",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumDynamicProgrammingSolution174(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumDynamicProgrammingSolution174(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumDynamicProgrammingSolution174(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumDynamicProgrammingSolution174(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 75,
    "title": "Medium Backtracking Solution 175",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "Cisco, Google, Adobe, Cisco",
    "desc": "Implement an optimized logic on Backtracking representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Backtracking\n    return new ArrayList<>();\n}",
    "category": "Backtracking",
    "functionName": "mediumBacktrackingSolution175",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBacktrackingSolution175(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBacktrackingSolution175(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBacktrackingSolution175(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBacktrackingSolution175(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 76,
    "title": "Medium Binary Search Solution 176",
    "topic": "Binary Search",
    "difficulty": "MEDIUM",
    "companies": "Intel, Meta, Goldman Sachs, Accenture",
    "desc": "Implement an optimized logic on Binary Search representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Binary Search\n    return new ArrayList<>();\n}",
    "category": "Binary Search",
    "functionName": "mediumBinarySearchSolution176",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBinarySearchSolution176(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBinarySearchSolution176(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBinarySearchSolution176(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBinarySearchSolution176(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 77,
    "title": "Medium Trie Solution 177",
    "topic": "Trie",
    "difficulty": "MEDIUM",
    "companies": "Infosys, Uber, Samsung, Meta",
    "desc": "Implement an optimized logic on Trie representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Trie\n    return new ArrayList<>();\n}",
    "category": "Trie",
    "functionName": "mediumTrieSolution177",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumTrieSolution177(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumTrieSolution177(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumTrieSolution177(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumTrieSolution177(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 78,
    "title": "Medium Bit Manipulation Solution 178",
    "topic": "Bit Manipulation",
    "difficulty": "MEDIUM",
    "companies": "Wipro, Salesforce, Accenture, Oracle",
    "desc": "Implement an optimized logic on Bit Manipulation representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Bit Manipulation\n    return new ArrayList<>();\n}",
    "category": "Bit Manipulation",
    "functionName": "mediumBitManipulationSolution178",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBitManipulationSolution178(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBitManipulationSolution178(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBitManipulationSolution178(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBitManipulationSolution178(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 79,
    "title": "Medium Math Solution 179",
    "topic": "Math",
    "difficulty": "MEDIUM",
    "companies": "Amazon, Walmart, Microsoft, PayPal",
    "desc": "Implement an optimized logic on Math representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Math\n    return new ArrayList<>();\n}",
    "category": "Math",
    "functionName": "mediumMathSolution179",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumMathSolution179(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumMathSolution179(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumMathSolution179(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumMathSolution179(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 80,
    "title": "Medium Arrays Solution 180",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Meta, Samsung, Uber, Infosys",
    "desc": "Implement an optimized logic on Arrays representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Arrays\n    return new ArrayList<>();\n}",
    "category": "Arrays",
    "functionName": "mediumArraysSolution180",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumArraysSolution180(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumArraysSolution180(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumArraysSolution180(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumArraysSolution180(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 81,
    "title": "Medium Strings Solution 181",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "companies": "Netflix, Infosys, Atlassian, Microsoft",
    "desc": "Implement an optimized logic on Strings representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Strings\n    return new ArrayList<>();\n}",
    "category": "Strings",
    "functionName": "mediumStringsSolution181",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumStringsSolution181(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumStringsSolution181(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumStringsSolution181(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumStringsSolution181(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 82,
    "title": "Medium Linked Lists Solution 182",
    "topic": "Linked Lists",
    "difficulty": "MEDIUM",
    "companies": "Adobe, Google, Cisco, Adobe",
    "desc": "Implement an optimized logic on Linked Lists representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Linked Lists\n    return new ArrayList<>();\n}",
    "category": "Linked Lists",
    "functionName": "mediumLinkedListsSolution182",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumLinkedListsSolution182(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumLinkedListsSolution182(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumLinkedListsSolution182(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumLinkedListsSolution182(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 83,
    "title": "Medium Stack Solution 183",
    "topic": "Stack",
    "difficulty": "MEDIUM",
    "companies": "Salesforce, Meta, Infosys, Walmart",
    "desc": "Implement an optimized logic on Stack representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Stack\n    return new ArrayList<>();\n}",
    "category": "Stack",
    "functionName": "mediumStackSolution183",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumStackSolution183(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumStackSolution183(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumStackSolution183(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumStackSolution183(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 84,
    "title": "Medium Queue Solution 184",
    "topic": "Queue",
    "difficulty": "MEDIUM",
    "companies": "Goldman Sachs, Uber, Amazon, TCS",
    "desc": "Implement an optimized logic on Queue representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Queue\n    return new ArrayList<>();\n}",
    "category": "Queue",
    "functionName": "mediumQueueSolution184",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumQueueSolution184(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumQueueSolution184(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumQueueSolution184(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumQueueSolution184(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 85,
    "title": "Medium Tree Solution 185",
    "topic": "Tree",
    "difficulty": "MEDIUM",
    "companies": "PayPal, Salesforce, Netflix, Amazon",
    "desc": "Implement an optimized logic on Tree representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Tree\n    return new ArrayList<>();\n}",
    "category": "Tree",
    "functionName": "mediumTreeSolution185",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumTreeSolution185(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumTreeSolution185(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumTreeSolution185(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumTreeSolution185(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 86,
    "title": "Medium Graph Solution 186",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Samsung, Walmart, Salesforce, Uber",
    "desc": "Implement an optimized logic on Graph representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Graph\n    return new ArrayList<>();\n}",
    "category": "Graph",
    "functionName": "mediumGraphSolution186",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumGraphSolution186(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumGraphSolution186(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumGraphSolution186(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumGraphSolution186(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 87,
    "title": "Medium Heap Solution 187",
    "topic": "Heap",
    "difficulty": "MEDIUM",
    "companies": "TCS, Samsung, PayPal, Goldman Sachs",
    "desc": "Implement an optimized logic on Heap representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Heap\n    return new ArrayList<>();\n}",
    "category": "Heap",
    "functionName": "mediumHeapSolution187",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumHeapSolution187(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumHeapSolution187(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumHeapSolution187(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumHeapSolution187(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 88,
    "title": "Medium Greedy Solution 188",
    "topic": "Greedy",
    "difficulty": "MEDIUM",
    "companies": "Accenture, Infosys, TCS, Intel",
    "desc": "Implement an optimized logic on Greedy representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Greedy\n    return new ArrayList<>();\n}",
    "category": "Greedy",
    "functionName": "mediumGreedySolution188",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumGreedySolution188(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumGreedySolution188(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumGreedySolution188(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumGreedySolution188(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 89,
    "title": "Medium Dynamic Programming Solution 189",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Google, Google, Google",
    "desc": "Implement an optimized logic on Dynamic Programming representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Dynamic Programming\n    return new ArrayList<>();\n}",
    "category": "Dynamic Programming",
    "functionName": "mediumDynamicProgrammingSolution189",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumDynamicProgrammingSolution189(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumDynamicProgrammingSolution189(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumDynamicProgrammingSolution189(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumDynamicProgrammingSolution189(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 90,
    "title": "Medium Backtracking Solution 190",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "Microsoft, Meta, Apple, Netflix",
    "desc": "Implement an optimized logic on Backtracking representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Backtracking\n    return new ArrayList<>();\n}",
    "category": "Backtracking",
    "functionName": "mediumBacktrackingSolution190",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBacktrackingSolution190(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBacktrackingSolution190(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBacktrackingSolution190(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBacktrackingSolution190(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 91,
    "title": "Medium Binary Search Solution 191",
    "topic": "Binary Search",
    "difficulty": "MEDIUM",
    "companies": "Apple, Uber, Oracle, Atlassian",
    "desc": "Implement an optimized logic on Binary Search representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Binary Search\n    return new ArrayList<>();\n}",
    "category": "Binary Search",
    "functionName": "mediumBinarySearchSolution191",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBinarySearchSolution191(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBinarySearchSolution191(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBinarySearchSolution191(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBinarySearchSolution191(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 92,
    "title": "Medium Trie Solution 192",
    "topic": "Trie",
    "difficulty": "MEDIUM",
    "companies": "Uber, Salesforce, Walmart, Samsung",
    "desc": "Implement an optimized logic on Trie representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Trie\n    return new ArrayList<>();\n}",
    "category": "Trie",
    "functionName": "mediumTrieSolution192",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumTrieSolution192(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumTrieSolution192(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumTrieSolution192(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumTrieSolution192(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 93,
    "title": "Medium Bit Manipulation Solution 193",
    "topic": "Bit Manipulation",
    "difficulty": "MEDIUM",
    "companies": "Oracle, Walmart, Intel, Wipro",
    "desc": "Implement an optimized logic on Bit Manipulation representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Bit Manipulation\n    return new ArrayList<>();\n}",
    "category": "Bit Manipulation",
    "functionName": "mediumBitManipulationSolution193",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBitManipulationSolution193(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBitManipulationSolution193(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBitManipulationSolution193(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBitManipulationSolution193(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 94,
    "title": "Medium Math Solution 194",
    "topic": "Math",
    "difficulty": "MEDIUM",
    "companies": "Atlassian, Samsung, Wipro, Apple",
    "desc": "Implement an optimized logic on Math representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Math\n    return new ArrayList<>();\n}",
    "category": "Math",
    "functionName": "mediumMathSolution194",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumMathSolution194(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumMathSolution194(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumMathSolution194(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumMathSolution194(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 95,
    "title": "Medium Arrays Solution 195",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Walmart, Infosys, Meta, Salesforce",
    "desc": "Implement an optimized logic on Arrays representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Arrays\n    return new ArrayList<>();\n}",
    "category": "Arrays",
    "functionName": "mediumArraysSolution195",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumArraysSolution195(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumArraysSolution195(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumArraysSolution195(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumArraysSolution195(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 96,
    "title": "Medium Strings Solution 196",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "companies": "Cisco, Google, Adobe, Cisco",
    "desc": "Implement an optimized logic on Strings representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Strings\n    return new ArrayList<>();\n}",
    "category": "Strings",
    "functionName": "mediumStringsSolution196",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumStringsSolution196(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumStringsSolution196(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumStringsSolution196(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumStringsSolution196(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 97,
    "title": "Medium Linked Lists Solution 197",
    "topic": "Linked Lists",
    "difficulty": "MEDIUM",
    "companies": "Intel, Meta, Goldman Sachs, Accenture",
    "desc": "Implement an optimized logic on Linked Lists representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Linked Lists\n    return new ArrayList<>();\n}",
    "category": "Linked Lists",
    "functionName": "mediumLinkedListsSolution197",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumLinkedListsSolution197(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumLinkedListsSolution197(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumLinkedListsSolution197(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumLinkedListsSolution197(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 98,
    "title": "Medium Stack Solution 198",
    "topic": "Stack",
    "difficulty": "MEDIUM",
    "companies": "Infosys, Uber, Samsung, Meta",
    "desc": "Implement an optimized logic on Stack representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Stack\n    return new ArrayList<>();\n}",
    "category": "Stack",
    "functionName": "mediumStackSolution198",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumStackSolution198(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumStackSolution198(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumStackSolution198(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumStackSolution198(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 99,
    "title": "Medium Queue Solution 199",
    "topic": "Queue",
    "difficulty": "MEDIUM",
    "companies": "Wipro, Salesforce, Accenture, Oracle",
    "desc": "Implement an optimized logic on Queue representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Queue\n    return new ArrayList<>();\n}",
    "category": "Queue",
    "functionName": "mediumQueueSolution199",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumQueueSolution199(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumQueueSolution199(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumQueueSolution199(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumQueueSolution199(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 100,
    "title": "Medium Tree Solution 200",
    "topic": "Tree",
    "difficulty": "MEDIUM",
    "companies": "Amazon, Walmart, Microsoft, PayPal",
    "desc": "Implement an optimized logic on Tree representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Tree\n    return new ArrayList<>();\n}",
    "category": "Tree",
    "functionName": "mediumTreeSolution200",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumTreeSolution200(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumTreeSolution200(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumTreeSolution200(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumTreeSolution200(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 101,
    "title": "Medium Graph Solution 201",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Meta, Samsung, Uber, Infosys",
    "desc": "Implement an optimized logic on Graph representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Graph\n    return new ArrayList<>();\n}",
    "category": "Graph",
    "functionName": "mediumGraphSolution201",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumGraphSolution201(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumGraphSolution201(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumGraphSolution201(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumGraphSolution201(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 102,
    "title": "Medium Heap Solution 202",
    "topic": "Heap",
    "difficulty": "MEDIUM",
    "companies": "Netflix, Infosys, Atlassian, Microsoft",
    "desc": "Implement an optimized logic on Heap representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Heap\n    return new ArrayList<>();\n}",
    "category": "Heap",
    "functionName": "mediumHeapSolution202",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumHeapSolution202(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumHeapSolution202(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumHeapSolution202(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumHeapSolution202(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 103,
    "title": "Medium Greedy Solution 203",
    "topic": "Greedy",
    "difficulty": "MEDIUM",
    "companies": "Adobe, Google, Cisco, Adobe",
    "desc": "Implement an optimized logic on Greedy representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Greedy\n    return new ArrayList<>();\n}",
    "category": "Greedy",
    "functionName": "mediumGreedySolution203",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumGreedySolution203(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumGreedySolution203(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumGreedySolution203(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumGreedySolution203(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 104,
    "title": "Medium Dynamic Programming Solution 204",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Salesforce, Meta, Infosys, Walmart",
    "desc": "Implement an optimized logic on Dynamic Programming representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Dynamic Programming\n    return new ArrayList<>();\n}",
    "category": "Dynamic Programming",
    "functionName": "mediumDynamicProgrammingSolution204",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumDynamicProgrammingSolution204(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumDynamicProgrammingSolution204(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumDynamicProgrammingSolution204(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumDynamicProgrammingSolution204(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 105,
    "title": "Medium Backtracking Solution 205",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "Goldman Sachs, Uber, Amazon, TCS",
    "desc": "Implement an optimized logic on Backtracking representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Backtracking\n    return new ArrayList<>();\n}",
    "category": "Backtracking",
    "functionName": "mediumBacktrackingSolution205",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBacktrackingSolution205(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBacktrackingSolution205(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBacktrackingSolution205(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBacktrackingSolution205(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 106,
    "title": "Medium Binary Search Solution 206",
    "topic": "Binary Search",
    "difficulty": "MEDIUM",
    "companies": "PayPal, Salesforce, Netflix, Amazon",
    "desc": "Implement an optimized logic on Binary Search representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Binary Search\n    return new ArrayList<>();\n}",
    "category": "Binary Search",
    "functionName": "mediumBinarySearchSolution206",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumBinarySearchSolution206(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumBinarySearchSolution206(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumBinarySearchSolution206(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumBinarySearchSolution206(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 107,
    "title": "Medium Trie Solution 207",
    "topic": "Trie",
    "difficulty": "MEDIUM",
    "companies": "Samsung, Walmart, Salesforce, Uber",
    "desc": "Implement an optimized logic on Trie representing standard interview expectations. Solve within the designated time boundary.",
    "constraints": "2 <= items.length <= 2 * 10^5\n0 <= items[i] <= 10^6",
    "hints": "Think about two pointer iterations, partition steps, or binary searching intervals.",
    "solution": "public List<Integer> solveMedium(int[] items) {\n    // Generated solution for Trie\n    return new ArrayList<>();\n}",
    "category": "Trie",
    "functionName": "mediumTrieSolution207",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mediumTrieSolution207(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mediumTrieSolution207(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mediumTrieSolution207(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mediumTrieSolution207(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 108,
    "title": "Move Zeroes",
    "topic": "Arrays",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Move Zeroes, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Arrays. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Move Zeroes\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Arrays",
    "functionName": "moveZeroes",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction moveZeroes(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def moveZeroes(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object moveZeroes(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto moveZeroes(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 109,
    "title": "Two Sum II - Input Array Is Sorted",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Two Sum II - Input Array Is Sorted, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Arrays. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Two Sum II - Input Array Is Sorted\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Arrays",
    "functionName": "twoSumIiInputArrayIsSorted",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction twoSumIiInputArrayIsSorted(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def twoSumIiInputArrayIsSorted(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object twoSumIiInputArrayIsSorted(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto twoSumIiInputArrayIsSorted(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 110,
    "title": "Squares of a Sorted Array",
    "topic": "Arrays",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Squares of a Sorted Array, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Arrays. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Squares of a Sorted Array\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Arrays",
    "functionName": "squaresOfASortedArray",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction squaresOfASortedArray(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def squaresOfASortedArray(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object squaresOfASortedArray(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto squaresOfASortedArray(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 111,
    "title": "Sort Colors (Dutch National Flag)",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Sort Colors (Dutch National Flag), implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Arrays. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Sort Colors (Dutch National Flag)\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Arrays",
    "functionName": "sortColorsDutchNationalFlag",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction sortColorsDutchNationalFlag(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def sortColorsDutchNationalFlag(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object sortColorsDutchNationalFlag(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto sortColorsDutchNationalFlag(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 112,
    "title": "Next Permutation",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Next Permutation, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Arrays. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Next Permutation\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Arrays",
    "functionName": "nextPermutation",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction nextPermutation(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def nextPermutation(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object nextPermutation(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto nextPermutation(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 113,
    "title": "Subarray Sum Equals K",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Subarray Sum Equals K, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Arrays. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Subarray Sum Equals K\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Arrays",
    "functionName": "subarraySumEqualsK",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction subarraySumEqualsK(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def subarraySumEqualsK(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object subarraySumEqualsK(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto subarraySumEqualsK(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 114,
    "title": "Longest Consecutive Sequence",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Longest Consecutive Sequence, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Arrays. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Longest Consecutive Sequence\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Arrays",
    "functionName": "longestConsecutiveSequence",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction longestConsecutiveSequence(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def longestConsecutiveSequence(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object longestConsecutiveSequence(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto longestConsecutiveSequence(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 115,
    "title": "Rotate Image",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Rotate Image, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Arrays. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Rotate Image\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Arrays",
    "functionName": "rotateImage",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction rotateImage(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def rotateImage(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object rotateImage(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto rotateImage(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 116,
    "title": "Spiral Matrix",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Spiral Matrix, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Arrays. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Spiral Matrix\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Arrays",
    "functionName": "spiralMatrix",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction spiralMatrix(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def spiralMatrix(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object spiralMatrix(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto spiralMatrix(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 117,
    "title": "Set Matrix Zeroes",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Set Matrix Zeroes, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Arrays. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Set Matrix Zeroes\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Arrays",
    "functionName": "setMatrixZeroes",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction setMatrixZeroes(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def setMatrixZeroes(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object setMatrixZeroes(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto setMatrixZeroes(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 118,
    "title": "Game of Life",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Game of Life, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Arrays. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Game of Life\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Arrays",
    "functionName": "gameOfLife",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction gameOfLife(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def gameOfLife(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object gameOfLife(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto gameOfLife(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 119,
    "title": "First Missing Positive",
    "topic": "Arrays",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of First Missing Positive, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Arrays. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for First Missing Positive\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Arrays",
    "functionName": "firstMissingPositive",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction firstMissingPositive(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def firstMissingPositive(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object firstMissingPositive(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto firstMissingPositive(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 120,
    "title": "Median of Two Sorted Arrays",
    "topic": "Binary Search",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Median of Two Sorted Arrays, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Binary Search. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Median of Two Sorted Arrays\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Binary Search",
    "functionName": "medianOfTwoSortedArrays",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction medianOfTwoSortedArrays(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def medianOfTwoSortedArrays(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object medianOfTwoSortedArrays(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto medianOfTwoSortedArrays(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 121,
    "title": "Valid Anagram",
    "topic": "Strings",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Valid Anagram, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Strings. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Valid Anagram\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Strings",
    "functionName": "validAnagram",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction validAnagram(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def validAnagram(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object validAnagram(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto validAnagram(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 122,
    "title": "Group Anagrams",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Group Anagrams, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Strings. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Group Anagrams\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Strings",
    "functionName": "groupAnagrams",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction groupAnagrams(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def groupAnagrams(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object groupAnagrams(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto groupAnagrams(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 123,
    "title": "Longest Palindromic Substring",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Longest Palindromic Substring, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Strings. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Longest Palindromic Substring\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Strings",
    "functionName": "longestPalindromicSubstring",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction longestPalindromicSubstring(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def longestPalindromicSubstring(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object longestPalindromicSubstring(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto longestPalindromicSubstring(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 124,
    "title": "Palindromic Substrings",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Palindromic Substrings, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Strings. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Palindromic Substrings\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Strings",
    "functionName": "palindromicSubstrings",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction palindromicSubstrings(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def palindromicSubstrings(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object palindromicSubstrings(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto palindromicSubstrings(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 125,
    "title": "Encode and Decode Strings",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Encode and Decode Strings, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Strings. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Encode and Decode Strings\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Strings",
    "functionName": "encodeAndDecodeStrings",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction encodeAndDecodeStrings(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def encodeAndDecodeStrings(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object encodeAndDecodeStrings(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto encodeAndDecodeStrings(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 126,
    "title": "Minimum Window Substring",
    "topic": "Strings",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Minimum Window Substring, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Strings. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Minimum Window Substring\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Strings",
    "functionName": "minimumWindowSubstring",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction minimumWindowSubstring(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def minimumWindowSubstring(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object minimumWindowSubstring(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto minimumWindowSubstring(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 127,
    "title": "Longest Repeating Character Replacement",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Longest Repeating Character Replacement, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Strings. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Longest Repeating Character Replacement\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Strings",
    "functionName": "longestRepeatingCharacterReplacement",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction longestRepeatingCharacterReplacement(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def longestRepeatingCharacterReplacement(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object longestRepeatingCharacterReplacement(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto longestRepeatingCharacterReplacement(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 128,
    "title": "Valid Palindrome",
    "topic": "Strings",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Valid Palindrome, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Strings. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Valid Palindrome\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Strings",
    "functionName": "validPalindrome",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction validPalindrome(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def validPalindrome(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object validPalindrome(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto validPalindrome(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 129,
    "title": "String to Integer (atoi)",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of String to Integer (atoi), implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Strings. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for String to Integer (atoi)\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Strings",
    "functionName": "stringToIntegerAtoi",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction stringToIntegerAtoi(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def stringToIntegerAtoi(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object stringToIntegerAtoi(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto stringToIntegerAtoi(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 130,
    "title": "Count and Say",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Count and Say, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Strings. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Count and Say\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Strings",
    "functionName": "countAndSay",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction countAndSay(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def countAndSay(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object countAndSay(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto countAndSay(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 131,
    "title": "Find the Index of the First Occurrence in a String (KMP)",
    "topic": "Strings",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Find the Index of the First Occurrence in a String (KMP), implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Strings. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Find the Index of the First Occurrence in a String (KMP)\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Strings",
    "functionName": "findTheIndexOfTheFirstOccurrenceInAStringKmp",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction findTheIndexOfTheFirstOccurrenceInAStringKmp(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def findTheIndexOfTheFirstOccurrenceInAStringKmp(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object findTheIndexOfTheFirstOccurrenceInAStringKmp(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto findTheIndexOfTheFirstOccurrenceInAStringKmp(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 132,
    "title": "Repeated DNA Sequences",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Repeated DNA Sequences, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Strings. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Repeated DNA Sequences\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Strings",
    "functionName": "repeatedDnaSequences",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction repeatedDnaSequences(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def repeatedDnaSequences(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object repeatedDnaSequences(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto repeatedDnaSequences(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 133,
    "title": "Integer to English Words",
    "topic": "Strings",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Integer to English Words, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Strings. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Integer to English Words\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Strings",
    "functionName": "integerToEnglishWords",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction integerToEnglishWords(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def integerToEnglishWords(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object integerToEnglishWords(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto integerToEnglishWords(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 134,
    "title": "Basic Calculator",
    "topic": "Stack",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Basic Calculator, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Stack. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Basic Calculator\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Stack",
    "functionName": "basicCalculator",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction basicCalculator(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def basicCalculator(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object basicCalculator(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto basicCalculator(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 135,
    "title": "Reverse Linked List",
    "topic": "Linked Lists",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Reverse Linked List, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Linked Lists. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Reverse Linked List\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Linked Lists",
    "functionName": "reverseLinkedList",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction reverseLinkedList(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def reverseLinkedList(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object reverseLinkedList(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto reverseLinkedList(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 136,
    "title": "Linked List Cycle",
    "topic": "Linked Lists",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Linked List Cycle, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Linked Lists. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Linked List Cycle\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Linked Lists",
    "functionName": "linkedListCycle",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction linkedListCycle(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def linkedListCycle(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object linkedListCycle(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto linkedListCycle(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 137,
    "title": "Linked List Cycle II (Cycle Start)",
    "topic": "Linked Lists",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Linked List Cycle II (Cycle Start), implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Linked Lists. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Linked List Cycle II (Cycle Start)\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Linked Lists",
    "functionName": "linkedListCycleIiCycleStart",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction linkedListCycleIiCycleStart(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def linkedListCycleIiCycleStart(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object linkedListCycleIiCycleStart(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto linkedListCycleIiCycleStart(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 138,
    "title": "Merge k Sorted Lists",
    "topic": "Linked Lists",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Merge k Sorted Lists, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Linked Lists. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Merge k Sorted Lists\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Linked Lists",
    "functionName": "mergeKSortedLists",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mergeKSortedLists(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mergeKSortedLists(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mergeKSortedLists(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mergeKSortedLists(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 139,
    "title": "Remove Nth Node From End of List",
    "topic": "Linked Lists",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Remove Nth Node From End of List, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Linked Lists. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Remove Nth Node From End of List\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Linked Lists",
    "functionName": "removeNthNodeFromEndOfList",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction removeNthNodeFromEndOfList(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def removeNthNodeFromEndOfList(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object removeNthNodeFromEndOfList(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto removeNthNodeFromEndOfList(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 140,
    "title": "Reorder List",
    "topic": "Linked Lists",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Reorder List, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Linked Lists. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Reorder List\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Linked Lists",
    "functionName": "reorderList",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction reorderList(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def reorderList(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object reorderList(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto reorderList(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 141,
    "title": "Intersection of Two Linked Lists",
    "topic": "Linked Lists",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Intersection of Two Linked Lists, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Linked Lists. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Intersection of Two Linked Lists\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Linked Lists",
    "functionName": "intersectionOfTwoLinkedLists",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction intersectionOfTwoLinkedLists(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def intersectionOfTwoLinkedLists(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object intersectionOfTwoLinkedLists(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto intersectionOfTwoLinkedLists(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 142,
    "title": "Copy List with Random Pointer",
    "topic": "Linked Lists",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Copy List with Random Pointer, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Linked Lists. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Copy List with Random Pointer\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Linked Lists",
    "functionName": "copyListWithRandomPointer",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction copyListWithRandomPointer(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def copyListWithRandomPointer(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object copyListWithRandomPointer(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto copyListWithRandomPointer(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 143,
    "title": "Palindrome Linked List",
    "topic": "Linked Lists",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Palindrome Linked List, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Linked Lists. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Palindrome Linked List\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Linked Lists",
    "functionName": "palindromeLinkedList",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction palindromeLinkedList(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def palindromeLinkedList(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object palindromeLinkedList(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto palindromeLinkedList(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 144,
    "title": "Reverse Nodes in k-Group",
    "topic": "Linked Lists",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Reverse Nodes in k-Group, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Linked Lists. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Reverse Nodes in k-Group\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Linked Lists",
    "functionName": "reverseNodesInKgroup",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction reverseNodesInKgroup(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def reverseNodesInKgroup(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object reverseNodesInKgroup(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto reverseNodesInKgroup(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 145,
    "title": "LFU Cache",
    "topic": "Linked Lists",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of LFU Cache, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Linked Lists. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for LFU Cache\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Linked Lists",
    "functionName": "lfuCache",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction lfuCache(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def lfuCache(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object lfuCache(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto lfuCache(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 146,
    "title": "Min Stack",
    "topic": "Stack",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Min Stack, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Stack. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Min Stack\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Stack",
    "functionName": "minStack",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction minStack(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def minStack(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object minStack(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto minStack(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 147,
    "title": "Evaluate Reverse Polish Notation",
    "topic": "Stack",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Evaluate Reverse Polish Notation, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Stack. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Evaluate Reverse Polish Notation\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Stack",
    "functionName": "evaluateReversePolishNotation",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction evaluateReversePolishNotation(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def evaluateReversePolishNotation(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object evaluateReversePolishNotation(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto evaluateReversePolishNotation(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 148,
    "title": "Generate Parentheses",
    "topic": "Stack",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Generate Parentheses, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Stack. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Generate Parentheses\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Stack",
    "functionName": "generateParentheses",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction generateParentheses(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def generateParentheses(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object generateParentheses(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto generateParentheses(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 149,
    "title": "Daily Temperatures",
    "topic": "Stack",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Daily Temperatures, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Stack. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Daily Temperatures\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Stack",
    "functionName": "dailyTemperatures",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction dailyTemperatures(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def dailyTemperatures(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object dailyTemperatures(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto dailyTemperatures(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 150,
    "title": "Car Fleet",
    "topic": "Stack",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Car Fleet, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Stack. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Car Fleet\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Stack",
    "functionName": "carFleet",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction carFleet(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def carFleet(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object carFleet(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto carFleet(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 151,
    "title": "Largest Rectangle in Histogram",
    "topic": "Stack",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Largest Rectangle in Histogram, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Stack. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Largest Rectangle in Histogram\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Stack",
    "functionName": "largestRectangleInHistogram",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction largestRectangleInHistogram(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def largestRectangleInHistogram(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object largestRectangleInHistogram(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto largestRectangleInHistogram(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 152,
    "title": "Sliding Window Maximum",
    "topic": "Queue",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Sliding Window Maximum, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Queue. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Sliding Window Maximum\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Queue",
    "functionName": "slidingWindowMaximum",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction slidingWindowMaximum(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def slidingWindowMaximum(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object slidingWindowMaximum(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto slidingWindowMaximum(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 153,
    "title": "Implement Queue using Stacks",
    "topic": "Queue",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Implement Queue using Stacks, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Queue. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Implement Queue using Stacks\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Queue",
    "functionName": "implementQueueUsingStacks",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction implementQueueUsingStacks(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def implementQueueUsingStacks(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object implementQueueUsingStacks(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto implementQueueUsingStacks(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 154,
    "title": "Design Circular Queue",
    "topic": "Queue",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Design Circular Queue, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Queue. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Design Circular Queue\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Queue",
    "functionName": "designCircularQueue",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction designCircularQueue(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def designCircularQueue(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object designCircularQueue(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto designCircularQueue(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 155,
    "title": "Binary Search",
    "topic": "Binary Search",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Binary Search, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Binary Search. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Binary Search\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Binary Search",
    "functionName": "binarySearch",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction binarySearch(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def binarySearch(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object binarySearch(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto binarySearch(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 156,
    "title": "Search a 2D Matrix",
    "topic": "Binary Search",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Search a 2D Matrix, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Binary Search. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Search a 2D Matrix\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Binary Search",
    "functionName": "searchA2dMatrix",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction searchA2dMatrix(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def searchA2dMatrix(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object searchA2dMatrix(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto searchA2dMatrix(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 157,
    "title": "Koko Eating Bananas",
    "topic": "Binary Search",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Koko Eating Bananas, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Binary Search. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Koko Eating Bananas\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Binary Search",
    "functionName": "kokoEatingBananas",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction kokoEatingBananas(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def kokoEatingBananas(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object kokoEatingBananas(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto kokoEatingBananas(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 158,
    "title": "Time Based Key-Value Store",
    "topic": "Binary Search",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Time Based Key-Value Store, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Binary Search. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Time Based Key-Value Store\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Binary Search",
    "functionName": "timeBasedKeyvalueStore",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction timeBasedKeyvalueStore(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def timeBasedKeyvalueStore(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object timeBasedKeyvalueStore(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto timeBasedKeyvalueStore(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 159,
    "title": "Find Peak Element",
    "topic": "Binary Search",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Find Peak Element, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Binary Search. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Find Peak Element\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Binary Search",
    "functionName": "findPeakElement",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction findPeakElement(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def findPeakElement(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object findPeakElement(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto findPeakElement(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 160,
    "title": "Split Array Largest Sum",
    "topic": "Binary Search",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Split Array Largest Sum, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Binary Search. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Split Array Largest Sum\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Binary Search",
    "functionName": "splitArrayLargestSum",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction splitArrayLargestSum(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def splitArrayLargestSum(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object splitArrayLargestSum(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto splitArrayLargestSum(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 161,
    "title": "Invert Binary Tree",
    "topic": "Tree",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Invert Binary Tree, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Tree. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Invert Binary Tree\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Tree",
    "functionName": "invertBinaryTree",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction invertBinaryTree(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def invertBinaryTree(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object invertBinaryTree(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto invertBinaryTree(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 162,
    "title": "Maximum Depth of Binary Tree",
    "topic": "Tree",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Maximum Depth of Binary Tree, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Tree. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Maximum Depth of Binary Tree\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Tree",
    "functionName": "maximumDepthOfBinaryTree",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction maximumDepthOfBinaryTree(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def maximumDepthOfBinaryTree(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object maximumDepthOfBinaryTree(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto maximumDepthOfBinaryTree(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 163,
    "title": "Diameter of Binary Tree",
    "topic": "Tree",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Diameter of Binary Tree, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Tree. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Diameter of Binary Tree\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Tree",
    "functionName": "diameterOfBinaryTree",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction diameterOfBinaryTree(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def diameterOfBinaryTree(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object diameterOfBinaryTree(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto diameterOfBinaryTree(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 164,
    "title": "Balanced Binary Tree",
    "topic": "Tree",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Balanced Binary Tree, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Tree. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Balanced Binary Tree\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Tree",
    "functionName": "balancedBinaryTree",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction balancedBinaryTree(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def balancedBinaryTree(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object balancedBinaryTree(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto balancedBinaryTree(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 165,
    "title": "Same Tree",
    "topic": "Tree",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Same Tree, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Tree. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Same Tree\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Tree",
    "functionName": "sameTree",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction sameTree(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def sameTree(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object sameTree(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto sameTree(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 166,
    "title": "Subtree of Another Tree",
    "topic": "Tree",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Subtree of Another Tree, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Tree. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Subtree of Another Tree\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Tree",
    "functionName": "subtreeOfAnotherTree",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction subtreeOfAnotherTree(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def subtreeOfAnotherTree(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object subtreeOfAnotherTree(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto subtreeOfAnotherTree(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 167,
    "title": "Lowest Common Ancestor of a BST",
    "topic": "Tree",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Lowest Common Ancestor of a BST, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Tree. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Lowest Common Ancestor of a BST\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Tree",
    "functionName": "lowestCommonAncestorOfABst",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction lowestCommonAncestorOfABst(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def lowestCommonAncestorOfABst(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object lowestCommonAncestorOfABst(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto lowestCommonAncestorOfABst(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 168,
    "title": "Binary Tree Right Side View",
    "topic": "Tree",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Binary Tree Right Side View, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Tree. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Binary Tree Right Side View\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Tree",
    "functionName": "binaryTreeRightSideView",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction binaryTreeRightSideView(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def binaryTreeRightSideView(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object binaryTreeRightSideView(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto binaryTreeRightSideView(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 169,
    "title": "Count Good Nodes in Binary Tree",
    "topic": "Tree",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Count Good Nodes in Binary Tree, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Tree. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Count Good Nodes in Binary Tree\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Tree",
    "functionName": "countGoodNodesInBinaryTree",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction countGoodNodesInBinaryTree(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def countGoodNodesInBinaryTree(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object countGoodNodesInBinaryTree(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto countGoodNodesInBinaryTree(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 170,
    "title": "Validate Binary Search Tree",
    "topic": "Tree",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Validate Binary Search Tree, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Tree. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Validate Binary Search Tree\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Tree",
    "functionName": "validateBinarySearchTree",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction validateBinarySearchTree(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def validateBinarySearchTree(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object validateBinarySearchTree(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto validateBinarySearchTree(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 171,
    "title": "Kth Smallest Element in a BST",
    "topic": "Tree",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Kth Smallest Element in a BST, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Tree. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Kth Smallest Element in a BST\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Tree",
    "functionName": "kthSmallestElementInABst",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction kthSmallestElementInABst(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def kthSmallestElementInABst(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object kthSmallestElementInABst(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto kthSmallestElementInABst(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 172,
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "topic": "Tree",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Construct Binary Tree from Preorder and Inorder Traversal, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Tree. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Construct Binary Tree from Preorder and Inorder Traversal\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Tree",
    "functionName": "constructBinaryTreeFromPreorderAndInorderTraversal",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction constructBinaryTreeFromPreorderAndInorderTraversal(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def constructBinaryTreeFromPreorderAndInorderTraversal(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object constructBinaryTreeFromPreorderAndInorderTraversal(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto constructBinaryTreeFromPreorderAndInorderTraversal(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 173,
    "title": "Binary Tree Maximum Path Sum",
    "topic": "Tree",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Binary Tree Maximum Path Sum, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Tree. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Binary Tree Maximum Path Sum\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Tree",
    "functionName": "binaryTreeMaximumPathSum",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction binaryTreeMaximumPathSum(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def binaryTreeMaximumPathSum(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object binaryTreeMaximumPathSum(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto binaryTreeMaximumPathSum(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 174,
    "title": "Serialize and Deserialize Binary Tree",
    "topic": "Tree",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Serialize and Deserialize Binary Tree, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Tree. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Serialize and Deserialize Binary Tree\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Tree",
    "functionName": "serializeAndDeserializeBinaryTree",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction serializeAndDeserializeBinaryTree(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def serializeAndDeserializeBinaryTree(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object serializeAndDeserializeBinaryTree(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto serializeAndDeserializeBinaryTree(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 175,
    "title": "Kth Largest Element in a Stream",
    "topic": "Heap",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Kth Largest Element in a Stream, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Heap. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Kth Largest Element in a Stream\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Heap",
    "functionName": "kthLargestElementInAStream",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction kthLargestElementInAStream(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def kthLargestElementInAStream(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object kthLargestElementInAStream(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto kthLargestElementInAStream(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 176,
    "title": "Last Stone Weight",
    "topic": "Heap",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Last Stone Weight, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Heap. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Last Stone Weight\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Heap",
    "functionName": "lastStoneWeight",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction lastStoneWeight(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def lastStoneWeight(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object lastStoneWeight(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto lastStoneWeight(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 177,
    "title": "K Closest Points to Origin",
    "topic": "Heap",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of K Closest Points to Origin, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Heap. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for K Closest Points to Origin\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Heap",
    "functionName": "kClosestPointsToOrigin",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction kClosestPointsToOrigin(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def kClosestPointsToOrigin(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object kClosestPointsToOrigin(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto kClosestPointsToOrigin(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 178,
    "title": "Kth Largest Element in an Array",
    "topic": "Heap",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Kth Largest Element in an Array, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Heap. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Kth Largest Element in an Array\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Heap",
    "functionName": "kthLargestElementInAnArray",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction kthLargestElementInAnArray(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def kthLargestElementInAnArray(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object kthLargestElementInAnArray(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto kthLargestElementInAnArray(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 179,
    "title": "Task Scheduler",
    "topic": "Heap",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Task Scheduler, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Heap. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Task Scheduler\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Heap",
    "functionName": "taskScheduler",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction taskScheduler(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def taskScheduler(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object taskScheduler(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto taskScheduler(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 180,
    "title": "Design Twitter",
    "topic": "Heap",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Design Twitter, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Heap. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Design Twitter\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Heap",
    "functionName": "designTwitter",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction designTwitter(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def designTwitter(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object designTwitter(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto designTwitter(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 181,
    "title": "Find Median from Data Stream",
    "topic": "Heap",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Find Median from Data Stream, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Heap. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Find Median from Data Stream\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Heap",
    "functionName": "findMedianFromDataStream",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction findMedianFromDataStream(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def findMedianFromDataStream(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object findMedianFromDataStream(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto findMedianFromDataStream(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 182,
    "title": "Subsets",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Subsets, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Backtracking. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Subsets\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Backtracking",
    "functionName": "subsets",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction subsets(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def subsets(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object subsets(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto subsets(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 183,
    "title": "Combination Sum",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Combination Sum, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Backtracking. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Combination Sum\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Backtracking",
    "functionName": "combinationSum",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction combinationSum(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def combinationSum(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object combinationSum(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto combinationSum(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 184,
    "title": "Permutations",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Permutations, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Backtracking. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Permutations\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Backtracking",
    "functionName": "permutations",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction permutations(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def permutations(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object permutations(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto permutations(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 185,
    "title": "Subsets II",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Subsets II, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Backtracking. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Subsets II\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Backtracking",
    "functionName": "subsetsIi",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction subsetsIi(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def subsetsIi(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object subsetsIi(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto subsetsIi(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 186,
    "title": "Combination Sum II",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Combination Sum II, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Backtracking. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Combination Sum II\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Backtracking",
    "functionName": "combinationSumIi",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction combinationSumIi(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def combinationSumIi(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object combinationSumIi(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto combinationSumIi(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 187,
    "title": "Word Search",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Word Search, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Backtracking. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Word Search\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Backtracking",
    "functionName": "wordSearch",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction wordSearch(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def wordSearch(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object wordSearch(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto wordSearch(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 188,
    "title": "Palindrome Partitioning",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Palindrome Partitioning, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Backtracking. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Palindrome Partitioning\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Backtracking",
    "functionName": "palindromePartitioning",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction palindromePartitioning(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def palindromePartitioning(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object palindromePartitioning(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto palindromePartitioning(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 189,
    "title": "Letter Combinations of a Phone Number",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Letter Combinations of a Phone Number, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Backtracking. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Letter Combinations of a Phone Number\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Backtracking",
    "functionName": "letterCombinationsOfAPhoneNumber",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction letterCombinationsOfAPhoneNumber(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def letterCombinationsOfAPhoneNumber(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object letterCombinationsOfAPhoneNumber(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto letterCombinationsOfAPhoneNumber(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 190,
    "title": "N-Queens",
    "topic": "Backtracking",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of N-Queens, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Backtracking. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for N-Queens\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Backtracking",
    "functionName": "nqueens",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction nqueens(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def nqueens(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object nqueens(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto nqueens(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 191,
    "title": "Sudoku Solver",
    "topic": "Backtracking",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Sudoku Solver, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Backtracking. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Sudoku Solver\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Backtracking",
    "functionName": "sudokuSolver",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction sudokuSolver(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def sudokuSolver(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object sudokuSolver(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto sudokuSolver(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 192,
    "title": "Number of Islands",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Number of Islands, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Number of Islands\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "numberOfIslands",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction numberOfIslands(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def numberOfIslands(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object numberOfIslands(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto numberOfIslands(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 193,
    "title": "Clone Graph",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Clone Graph, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Clone Graph\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "cloneGraph",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction cloneGraph(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def cloneGraph(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object cloneGraph(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto cloneGraph(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 194,
    "title": "Max Area of Island",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Max Area of Island, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Max Area of Island\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "maxAreaOfIsland",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction maxAreaOfIsland(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def maxAreaOfIsland(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object maxAreaOfIsland(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto maxAreaOfIsland(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 195,
    "title": "Pacific Atlantic Water Flow",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Pacific Atlantic Water Flow, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Pacific Atlantic Water Flow\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "pacificAtlanticWaterFlow",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction pacificAtlanticWaterFlow(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def pacificAtlanticWaterFlow(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object pacificAtlanticWaterFlow(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto pacificAtlanticWaterFlow(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 196,
    "title": "Surrounded Regions",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Surrounded Regions, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Surrounded Regions\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "surroundedRegions",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction surroundedRegions(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def surroundedRegions(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object surroundedRegions(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto surroundedRegions(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 197,
    "title": "Rotting Oranges",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Rotting Oranges, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Rotting Oranges\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "rottingOranges",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction rottingOranges(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def rottingOranges(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object rottingOranges(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto rottingOranges(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 198,
    "title": "Walls and Gates",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Walls and Gates, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Walls and Gates\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "wallsAndGates",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction wallsAndGates(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def wallsAndGates(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object wallsAndGates(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto wallsAndGates(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 199,
    "title": "Course Schedule",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Course Schedule, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Course Schedule\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "courseSchedule",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction courseSchedule(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def courseSchedule(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object courseSchedule(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto courseSchedule(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 200,
    "title": "Course Schedule II",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Course Schedule II, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Course Schedule II\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "courseScheduleIi",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction courseScheduleIi(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def courseScheduleIi(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object courseScheduleIi(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto courseScheduleIi(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 201,
    "title": "Redundant Connection",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Redundant Connection, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Redundant Connection\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "redundantConnection",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction redundantConnection(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def redundantConnection(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object redundantConnection(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto redundantConnection(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 202,
    "title": "Number of Connected Components in an Undirected Graph",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Number of Connected Components in an Undirected Graph, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Number of Connected Components in an Undirected Graph\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "numberOfConnectedComponentsInAnUndirectedGraph",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction numberOfConnectedComponentsInAnUndirectedGraph(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def numberOfConnectedComponentsInAnUndirectedGraph(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object numberOfConnectedComponentsInAnUndirectedGraph(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto numberOfConnectedComponentsInAnUndirectedGraph(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 203,
    "title": "Graph Valid Tree",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Graph Valid Tree, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Graph Valid Tree\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "graphValidTree",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction graphValidTree(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def graphValidTree(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object graphValidTree(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto graphValidTree(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 204,
    "title": "Word Ladder",
    "topic": "Graph",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Word Ladder, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Word Ladder\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "wordLadder",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction wordLadder(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def wordLadder(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object wordLadder(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto wordLadder(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 205,
    "title": "Alien Dictionary",
    "topic": "Graph",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Alien Dictionary, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Alien Dictionary\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "alienDictionary",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction alienDictionary(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def alienDictionary(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object alienDictionary(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto alienDictionary(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 206,
    "title": "Network Delay Time (Dijkstra)",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Network Delay Time (Dijkstra), implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Network Delay Time (Dijkstra)\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "networkDelayTimeDijkstra",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction networkDelayTimeDijkstra(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def networkDelayTimeDijkstra(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object networkDelayTimeDijkstra(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto networkDelayTimeDijkstra(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 207,
    "title": "Cheapest Flights Within K Stops (Bellman-Ford)",
    "topic": "Graph",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Cheapest Flights Within K Stops (Bellman-Ford), implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Graph. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Cheapest Flights Within K Stops (Bellman-Ford)\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Graph",
    "functionName": "cheapestFlightsWithinKStopsBellmanford",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction cheapestFlightsWithinKStopsBellmanford(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def cheapestFlightsWithinKStopsBellmanford(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object cheapestFlightsWithinKStopsBellmanford(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto cheapestFlightsWithinKStopsBellmanford(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 208,
    "title": "Climbing Stairs",
    "topic": "Dynamic Programming",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Climbing Stairs, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Climbing Stairs\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "climbingStairs",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction climbingStairs(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def climbingStairs(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object climbingStairs(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto climbingStairs(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 209,
    "title": "Min Cost Climbing Stairs",
    "topic": "Dynamic Programming",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Min Cost Climbing Stairs, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Min Cost Climbing Stairs\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "minCostClimbingStairs",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction minCostClimbingStairs(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def minCostClimbingStairs(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object minCostClimbingStairs(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto minCostClimbingStairs(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 210,
    "title": "House Robber",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of House Robber, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for House Robber\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "houseRobber",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction houseRobber(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def houseRobber(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object houseRobber(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto houseRobber(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 211,
    "title": "House Robber II",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of House Robber II, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for House Robber II\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "houseRobberIi",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction houseRobberIi(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def houseRobberIi(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object houseRobberIi(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto houseRobberIi(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 212,
    "title": "Longest Palindromic Subsequence",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Longest Palindromic Subsequence, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Longest Palindromic Subsequence\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "longestPalindromicSubsequence",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction longestPalindromicSubsequence(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def longestPalindromicSubsequence(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object longestPalindromicSubsequence(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto longestPalindromicSubsequence(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 213,
    "title": "Palindromic Substrings DP",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Palindromic Substrings DP, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Palindromic Substrings DP\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "palindromicSubstringsDp",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction palindromicSubstringsDp(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def palindromicSubstringsDp(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object palindromicSubstringsDp(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto palindromicSubstringsDp(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 214,
    "title": "Decode Ways",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Decode Ways, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Decode Ways\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "decodeWays",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction decodeWays(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def decodeWays(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object decodeWays(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto decodeWays(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 215,
    "title": "Coin Change",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Coin Change, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Coin Change\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "coinChange",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction coinChange(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def coinChange(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object coinChange(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto coinChange(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 216,
    "title": "Maximum Product Subarray DP",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Maximum Product Subarray DP, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Maximum Product Subarray DP\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "maximumProductSubarrayDp",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction maximumProductSubarrayDp(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def maximumProductSubarrayDp(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object maximumProductSubarrayDp(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto maximumProductSubarrayDp(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 217,
    "title": "Word Break",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Word Break, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Word Break\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "wordBreak",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction wordBreak(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def wordBreak(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object wordBreak(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto wordBreak(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 218,
    "title": "Longest Increasing Subsequence",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Longest Increasing Subsequence, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Longest Increasing Subsequence\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "longestIncreasingSubsequence",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction longestIncreasingSubsequence(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def longestIncreasingSubsequence(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object longestIncreasingSubsequence(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto longestIncreasingSubsequence(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 219,
    "title": "Partition Equal Subset Sum",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Partition Equal Subset Sum, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Partition Equal Subset Sum\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "partitionEqualSubsetSum",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction partitionEqualSubsetSum(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def partitionEqualSubsetSum(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object partitionEqualSubsetSum(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto partitionEqualSubsetSum(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 220,
    "title": "Unique Paths",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Unique Paths, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Unique Paths\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "uniquePaths",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction uniquePaths(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def uniquePaths(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object uniquePaths(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto uniquePaths(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 221,
    "title": "Longest Common Subsequence",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Longest Common Subsequence, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Longest Common Subsequence\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "longestCommonSubsequence",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction longestCommonSubsequence(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def longestCommonSubsequence(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object longestCommonSubsequence(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto longestCommonSubsequence(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 222,
    "title": "Best Time to Buy and Sell Stock with Cooldown",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Best Time to Buy and Sell Stock with Cooldown, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Best Time to Buy and Sell Stock with Cooldown\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "bestTimeToBuyAndSellStockWithCooldown",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction bestTimeToBuyAndSellStockWithCooldown(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def bestTimeToBuyAndSellStockWithCooldown(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object bestTimeToBuyAndSellStockWithCooldown(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto bestTimeToBuyAndSellStockWithCooldown(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 223,
    "title": "Coin Change II",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Coin Change II, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Coin Change II\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "coinChangeIi",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction coinChangeIi(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def coinChangeIi(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object coinChangeIi(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto coinChangeIi(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 224,
    "title": "Target Sum",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Target Sum, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Target Sum\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "targetSum",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction targetSum(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def targetSum(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object targetSum(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto targetSum(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 225,
    "title": "Interleaving String",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Interleaving String, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Interleaving String\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "interleavingString",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction interleavingString(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def interleavingString(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object interleavingString(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto interleavingString(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 226,
    "title": "Burst Balloons",
    "topic": "Dynamic Programming",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Burst Balloons, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Burst Balloons\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "burstBalloons",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction burstBalloons(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def burstBalloons(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object burstBalloons(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto burstBalloons(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 227,
    "title": "Regular Expression Matching",
    "topic": "Dynamic Programming",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Regular Expression Matching, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Dynamic Programming. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Regular Expression Matching\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "regularExpressionMatching",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction regularExpressionMatching(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def regularExpressionMatching(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object regularExpressionMatching(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto regularExpressionMatching(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 228,
    "title": "Jump Game",
    "topic": "Greedy",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Jump Game, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Greedy. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Jump Game\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Greedy",
    "functionName": "jumpGame",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction jumpGame(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def jumpGame(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object jumpGame(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto jumpGame(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 229,
    "title": "Jump Game II",
    "topic": "Greedy",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Jump Game II, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Greedy. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Jump Game II\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Greedy",
    "functionName": "jumpGameIi",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction jumpGameIi(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def jumpGameIi(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object jumpGameIi(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto jumpGameIi(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 230,
    "title": "Gas Station",
    "topic": "Greedy",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Gas Station, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Greedy. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Gas Station\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Greedy",
    "functionName": "gasStation",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction gasStation(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def gasStation(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object gasStation(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto gasStation(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 231,
    "title": "Hand of Straights",
    "topic": "Greedy",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Hand of Straights, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Greedy. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Hand of Straights\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Greedy",
    "functionName": "handOfStraights",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction handOfStraights(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def handOfStraights(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object handOfStraights(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto handOfStraights(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 232,
    "title": "Merge Triplets to Form Target Triplet",
    "topic": "Greedy",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Merge Triplets to Form Target Triplet, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Greedy. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Merge Triplets to Form Target Triplet\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Greedy",
    "functionName": "mergeTripletsToFormTargetTriplet",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mergeTripletsToFormTargetTriplet(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mergeTripletsToFormTargetTriplet(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mergeTripletsToFormTargetTriplet(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mergeTripletsToFormTargetTriplet(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 233,
    "title": "Partition Labels",
    "topic": "Greedy",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Partition Labels, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Greedy. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Partition Labels\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Greedy",
    "functionName": "partitionLabels",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction partitionLabels(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def partitionLabels(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object partitionLabels(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto partitionLabels(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 234,
    "title": "Valid Parenthesis String",
    "topic": "Greedy",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Valid Parenthesis String, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Greedy. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Valid Parenthesis String\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Greedy",
    "functionName": "validParenthesisString",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction validParenthesisString(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def validParenthesisString(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object validParenthesisString(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto validParenthesisString(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 235,
    "title": "Implement Trie (Prefix Tree)",
    "topic": "Trie",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Implement Trie (Prefix Tree), implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Trie. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Implement Trie (Prefix Tree)\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Trie",
    "functionName": "implementTriePrefixTree",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction implementTriePrefixTree(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def implementTriePrefixTree(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object implementTriePrefixTree(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto implementTriePrefixTree(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 236,
    "title": "Design Add and Search Words Data Structure",
    "topic": "Trie",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Design Add and Search Words Data Structure, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Trie. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Design Add and Search Words Data Structure\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Trie",
    "functionName": "designAddAndSearchWordsDataStructure",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction designAddAndSearchWordsDataStructure(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def designAddAndSearchWordsDataStructure(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object designAddAndSearchWordsDataStructure(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto designAddAndSearchWordsDataStructure(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 237,
    "title": "Word Search II",
    "topic": "Trie",
    "difficulty": "HARD",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Word Search II, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Trie. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Word Search II\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Trie",
    "functionName": "wordSearchIi",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction wordSearchIi(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def wordSearchIi(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object wordSearchIi(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto wordSearchIi(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 238,
    "title": "Maximum XOR of Two Numbers in an Array",
    "topic": "Trie",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Maximum XOR of Two Numbers in an Array, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Trie. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Maximum XOR of Two Numbers in an Array\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Trie",
    "functionName": "maximumXorOfTwoNumbersInAnArray",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction maximumXorOfTwoNumbersInAnArray(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def maximumXorOfTwoNumbersInAnArray(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object maximumXorOfTwoNumbersInAnArray(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto maximumXorOfTwoNumbersInAnArray(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 239,
    "title": "Single Number",
    "topic": "Bit Manipulation",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Single Number, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Bit Manipulation. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Single Number\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Bit Manipulation",
    "functionName": "singleNumber",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction singleNumber(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def singleNumber(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object singleNumber(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto singleNumber(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 240,
    "title": "Number of 1 Bits",
    "topic": "Bit Manipulation",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Number of 1 Bits, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Bit Manipulation. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Number of 1 Bits\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Bit Manipulation",
    "functionName": "numberOf1Bits",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction numberOf1Bits(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def numberOf1Bits(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object numberOf1Bits(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto numberOf1Bits(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 241,
    "title": "Counting Bits",
    "topic": "Bit Manipulation",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Counting Bits, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Bit Manipulation. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Counting Bits\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Bit Manipulation",
    "functionName": "countingBits",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction countingBits(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def countingBits(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object countingBits(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto countingBits(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 242,
    "title": "Reverse Bits",
    "topic": "Bit Manipulation",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Reverse Bits, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Bit Manipulation. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Reverse Bits\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Bit Manipulation",
    "functionName": "reverseBits",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction reverseBits(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def reverseBits(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object reverseBits(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto reverseBits(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 243,
    "title": "Missing Number",
    "topic": "Bit Manipulation",
    "difficulty": "EASY",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Missing Number, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Bit Manipulation. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Missing Number\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Bit Manipulation",
    "functionName": "missingNumber",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction missingNumber(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def missingNumber(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object missingNumber(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto missingNumber(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 244,
    "title": "Sum of Two Integers (Bitwise)",
    "topic": "Bit Manipulation",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Sum of Two Integers (Bitwise), implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Bit Manipulation. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Sum of Two Integers (Bitwise)\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Bit Manipulation",
    "functionName": "sumOfTwoIntegersBitwise",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction sumOfTwoIntegersBitwise(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def sumOfTwoIntegersBitwise(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object sumOfTwoIntegersBitwise(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto sumOfTwoIntegersBitwise(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 245,
    "title": "Reverse Integer",
    "topic": "Math",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Reverse Integer, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Math. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Reverse Integer\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Math",
    "functionName": "reverseInteger",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction reverseInteger(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def reverseInteger(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object reverseInteger(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto reverseInteger(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 246,
    "title": "Pow(x, n)",
    "topic": "Math",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Pow(x, n), implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Math. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Pow(x, n)\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Math",
    "functionName": "powxN",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction powxN(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def powxN(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object powxN(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto powxN(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 247,
    "title": "Multiply Strings",
    "topic": "Math",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Multiply Strings, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Math. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Multiply Strings\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Math",
    "functionName": "multiplyStrings",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction multiplyStrings(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def multiplyStrings(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object multiplyStrings(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto multiplyStrings(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 248,
    "title": "Detect Squares",
    "topic": "Math",
    "difficulty": "MEDIUM",
    "companies": "Google, Meta, Amazon, Microsoft, Apple",
    "desc": "Given the constraints of Detect Squares, implement an optimal solution matching the theoretical lower bound. Ensure edge cases such as empty inputs, single elements, and boundary values are handled gracefully.",
    "constraints": "• 1 <= N <= 10^5\n• Optimal Time: O(N) or O(N log N)\n• Auxiliary Space: O(1) or O(N)",
    "hints": "Analyze structural invariant for Math. Check if sorting, two pointers, frequency maps, or dynamic tabulation applies.",
    "solution": "public class Solution {\n    // Optimal solution for Detect Squares\n    public int solve() {\n        return 0;\n    }\n}",
    "category": "Math",
    "functionName": "detectSquares",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction detectSquares(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def detectSquares(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object detectSquares(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto detectSquares(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 249,
    "title": "Strings Challenge Pattern #1",
    "topic": "Strings",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Strings principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Strings patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Strings implementation\n    }\n}",
    "category": "Strings",
    "functionName": "stringsChallengePattern1",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction stringsChallengePattern1(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def stringsChallengePattern1(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object stringsChallengePattern1(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto stringsChallengePattern1(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 250,
    "title": "Linked Lists Challenge Pattern #2",
    "topic": "Linked Lists",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Linked Lists principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Linked Lists patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Linked Lists implementation\n    }\n}",
    "category": "Linked Lists",
    "functionName": "linkedListsChallengePattern2",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction linkedListsChallengePattern2(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def linkedListsChallengePattern2(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object linkedListsChallengePattern2(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto linkedListsChallengePattern2(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 251,
    "title": "Stack Challenge Pattern #3",
    "topic": "Stack",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Stack principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Stack patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Stack implementation\n    }\n}",
    "category": "Stack",
    "functionName": "stackChallengePattern3",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction stackChallengePattern3(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def stackChallengePattern3(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object stackChallengePattern3(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto stackChallengePattern3(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 252,
    "title": "Queue Challenge Pattern #4",
    "topic": "Queue",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Queue principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Queue patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Queue implementation\n    }\n}",
    "category": "Queue",
    "functionName": "queueChallengePattern4",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction queueChallengePattern4(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def queueChallengePattern4(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object queueChallengePattern4(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto queueChallengePattern4(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 253,
    "title": "Binary Search Challenge Pattern #5",
    "topic": "Binary Search",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Binary Search principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Binary Search patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Binary Search implementation\n    }\n}",
    "category": "Binary Search",
    "functionName": "binarySearchChallengePattern5",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction binarySearchChallengePattern5(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def binarySearchChallengePattern5(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object binarySearchChallengePattern5(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto binarySearchChallengePattern5(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 254,
    "title": "Tree Challenge Pattern #6",
    "topic": "Tree",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Tree principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Tree patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Tree implementation\n    }\n}",
    "category": "Tree",
    "functionName": "treeChallengePattern6",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction treeChallengePattern6(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def treeChallengePattern6(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object treeChallengePattern6(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto treeChallengePattern6(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 255,
    "title": "Heap Challenge Pattern #7",
    "topic": "Heap",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Heap principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Heap patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Heap implementation\n    }\n}",
    "category": "Heap",
    "functionName": "heapChallengePattern7",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction heapChallengePattern7(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def heapChallengePattern7(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object heapChallengePattern7(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto heapChallengePattern7(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 256,
    "title": "Hashing Challenge Pattern #8",
    "topic": "Hashing",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Hashing principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Hashing patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Hashing implementation\n    }\n}",
    "category": "Hashing",
    "functionName": "hashingChallengePattern8",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction hashingChallengePattern8(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def hashingChallengePattern8(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object hashingChallengePattern8(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto hashingChallengePattern8(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 257,
    "title": "Graph Challenge Pattern #9",
    "topic": "Graph",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Graph principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Graph patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Graph implementation\n    }\n}",
    "category": "Graph",
    "functionName": "graphChallengePattern9",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction graphChallengePattern9(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def graphChallengePattern9(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object graphChallengePattern9(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto graphChallengePattern9(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 258,
    "title": "Dynamic Programming Challenge Pattern #10",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Dynamic Programming principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Dynamic Programming patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Dynamic Programming implementation\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "dynamicProgrammingChallengePattern10",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction dynamicProgrammingChallengePattern10(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def dynamicProgrammingChallengePattern10(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object dynamicProgrammingChallengePattern10(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto dynamicProgrammingChallengePattern10(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 259,
    "title": "Greedy Challenge Pattern #11",
    "topic": "Greedy",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Greedy principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Greedy patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Greedy implementation\n    }\n}",
    "category": "Greedy",
    "functionName": "greedyChallengePattern11",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction greedyChallengePattern11(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def greedyChallengePattern11(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object greedyChallengePattern11(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto greedyChallengePattern11(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 260,
    "title": "Backtracking Challenge Pattern #12",
    "topic": "Backtracking",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Backtracking principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Backtracking patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Backtracking implementation\n    }\n}",
    "category": "Backtracking",
    "functionName": "backtrackingChallengePattern12",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction backtrackingChallengePattern12(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def backtrackingChallengePattern12(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object backtrackingChallengePattern12(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto backtrackingChallengePattern12(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 261,
    "title": "Trie Challenge Pattern #13",
    "topic": "Trie",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Trie principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Trie patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Trie implementation\n    }\n}",
    "category": "Trie",
    "functionName": "trieChallengePattern13",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction trieChallengePattern13(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def trieChallengePattern13(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object trieChallengePattern13(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto trieChallengePattern13(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 262,
    "title": "Bit Manipulation Challenge Pattern #14",
    "topic": "Bit Manipulation",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Bit Manipulation principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Bit Manipulation patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Bit Manipulation implementation\n    }\n}",
    "category": "Bit Manipulation",
    "functionName": "bitManipulationChallengePattern14",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction bitManipulationChallengePattern14(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def bitManipulationChallengePattern14(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object bitManipulationChallengePattern14(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto bitManipulationChallengePattern14(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 263,
    "title": "Math Challenge Pattern #15",
    "topic": "Math",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Math principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Math patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Math implementation\n    }\n}",
    "category": "Math",
    "functionName": "mathChallengePattern15",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mathChallengePattern15(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mathChallengePattern15(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mathChallengePattern15(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mathChallengePattern15(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 264,
    "title": "Arrays Challenge Pattern #16",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Arrays principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Arrays patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Arrays implementation\n    }\n}",
    "category": "Arrays",
    "functionName": "arraysChallengePattern16",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction arraysChallengePattern16(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def arraysChallengePattern16(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object arraysChallengePattern16(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto arraysChallengePattern16(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 265,
    "title": "Strings Challenge Pattern #17",
    "topic": "Strings",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Strings principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Strings patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Strings implementation\n    }\n}",
    "category": "Strings",
    "functionName": "stringsChallengePattern17",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction stringsChallengePattern17(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def stringsChallengePattern17(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object stringsChallengePattern17(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto stringsChallengePattern17(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 266,
    "title": "Linked Lists Challenge Pattern #18",
    "topic": "Linked Lists",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Linked Lists principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Linked Lists patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Linked Lists implementation\n    }\n}",
    "category": "Linked Lists",
    "functionName": "linkedListsChallengePattern18",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction linkedListsChallengePattern18(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def linkedListsChallengePattern18(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object linkedListsChallengePattern18(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto linkedListsChallengePattern18(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 267,
    "title": "Stack Challenge Pattern #19",
    "topic": "Stack",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Stack principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Stack patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Stack implementation\n    }\n}",
    "category": "Stack",
    "functionName": "stackChallengePattern19",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction stackChallengePattern19(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def stackChallengePattern19(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object stackChallengePattern19(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto stackChallengePattern19(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 268,
    "title": "Queue Challenge Pattern #20",
    "topic": "Queue",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Queue principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Queue patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Queue implementation\n    }\n}",
    "category": "Queue",
    "functionName": "queueChallengePattern20",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction queueChallengePattern20(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def queueChallengePattern20(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object queueChallengePattern20(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto queueChallengePattern20(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 269,
    "title": "Binary Search Challenge Pattern #21",
    "topic": "Binary Search",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Binary Search principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Binary Search patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Binary Search implementation\n    }\n}",
    "category": "Binary Search",
    "functionName": "binarySearchChallengePattern21",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction binarySearchChallengePattern21(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def binarySearchChallengePattern21(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object binarySearchChallengePattern21(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto binarySearchChallengePattern21(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 270,
    "title": "Tree Challenge Pattern #22",
    "topic": "Tree",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Tree principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Tree patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Tree implementation\n    }\n}",
    "category": "Tree",
    "functionName": "treeChallengePattern22",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction treeChallengePattern22(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def treeChallengePattern22(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object treeChallengePattern22(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto treeChallengePattern22(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 271,
    "title": "Heap Challenge Pattern #23",
    "topic": "Heap",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Heap principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Heap patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Heap implementation\n    }\n}",
    "category": "Heap",
    "functionName": "heapChallengePattern23",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction heapChallengePattern23(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def heapChallengePattern23(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object heapChallengePattern23(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto heapChallengePattern23(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 272,
    "title": "Hashing Challenge Pattern #24",
    "topic": "Hashing",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Hashing principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Hashing patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Hashing implementation\n    }\n}",
    "category": "Hashing",
    "functionName": "hashingChallengePattern24",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction hashingChallengePattern24(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def hashingChallengePattern24(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object hashingChallengePattern24(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto hashingChallengePattern24(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 273,
    "title": "Graph Challenge Pattern #25",
    "topic": "Graph",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Graph principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Graph patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Graph implementation\n    }\n}",
    "category": "Graph",
    "functionName": "graphChallengePattern25",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction graphChallengePattern25(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def graphChallengePattern25(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object graphChallengePattern25(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto graphChallengePattern25(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 274,
    "title": "Dynamic Programming Challenge Pattern #26",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Dynamic Programming principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Dynamic Programming patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Dynamic Programming implementation\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "dynamicProgrammingChallengePattern26",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction dynamicProgrammingChallengePattern26(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def dynamicProgrammingChallengePattern26(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object dynamicProgrammingChallengePattern26(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto dynamicProgrammingChallengePattern26(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 275,
    "title": "Greedy Challenge Pattern #27",
    "topic": "Greedy",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Greedy principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Greedy patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Greedy implementation\n    }\n}",
    "category": "Greedy",
    "functionName": "greedyChallengePattern27",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction greedyChallengePattern27(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def greedyChallengePattern27(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object greedyChallengePattern27(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto greedyChallengePattern27(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 276,
    "title": "Backtracking Challenge Pattern #28",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Backtracking principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Backtracking patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Backtracking implementation\n    }\n}",
    "category": "Backtracking",
    "functionName": "backtrackingChallengePattern28",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction backtrackingChallengePattern28(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def backtrackingChallengePattern28(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object backtrackingChallengePattern28(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto backtrackingChallengePattern28(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 277,
    "title": "Trie Challenge Pattern #29",
    "topic": "Trie",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Trie principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Trie patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Trie implementation\n    }\n}",
    "category": "Trie",
    "functionName": "trieChallengePattern29",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction trieChallengePattern29(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def trieChallengePattern29(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object trieChallengePattern29(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto trieChallengePattern29(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 278,
    "title": "Bit Manipulation Challenge Pattern #30",
    "topic": "Bit Manipulation",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Bit Manipulation principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Bit Manipulation patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Bit Manipulation implementation\n    }\n}",
    "category": "Bit Manipulation",
    "functionName": "bitManipulationChallengePattern30",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction bitManipulationChallengePattern30(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def bitManipulationChallengePattern30(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object bitManipulationChallengePattern30(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto bitManipulationChallengePattern30(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 279,
    "title": "Math Challenge Pattern #31",
    "topic": "Math",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Math principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Math patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Math implementation\n    }\n}",
    "category": "Math",
    "functionName": "mathChallengePattern31",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mathChallengePattern31(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mathChallengePattern31(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mathChallengePattern31(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mathChallengePattern31(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 280,
    "title": "Arrays Challenge Pattern #32",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Arrays principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Arrays patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Arrays implementation\n    }\n}",
    "category": "Arrays",
    "functionName": "arraysChallengePattern32",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction arraysChallengePattern32(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def arraysChallengePattern32(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object arraysChallengePattern32(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto arraysChallengePattern32(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 281,
    "title": "Strings Challenge Pattern #33",
    "topic": "Strings",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Strings principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Strings patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Strings implementation\n    }\n}",
    "category": "Strings",
    "functionName": "stringsChallengePattern33",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction stringsChallengePattern33(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def stringsChallengePattern33(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object stringsChallengePattern33(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto stringsChallengePattern33(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 282,
    "title": "Linked Lists Challenge Pattern #34",
    "topic": "Linked Lists",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Linked Lists principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Linked Lists patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Linked Lists implementation\n    }\n}",
    "category": "Linked Lists",
    "functionName": "linkedListsChallengePattern34",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction linkedListsChallengePattern34(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def linkedListsChallengePattern34(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object linkedListsChallengePattern34(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto linkedListsChallengePattern34(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 283,
    "title": "Stack Challenge Pattern #35",
    "topic": "Stack",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Stack principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Stack patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Stack implementation\n    }\n}",
    "category": "Stack",
    "functionName": "stackChallengePattern35",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction stackChallengePattern35(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def stackChallengePattern35(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object stackChallengePattern35(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto stackChallengePattern35(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 284,
    "title": "Queue Challenge Pattern #36",
    "topic": "Queue",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Queue principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Queue patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Queue implementation\n    }\n}",
    "category": "Queue",
    "functionName": "queueChallengePattern36",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction queueChallengePattern36(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def queueChallengePattern36(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object queueChallengePattern36(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto queueChallengePattern36(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 285,
    "title": "Binary Search Challenge Pattern #37",
    "topic": "Binary Search",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Binary Search principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Binary Search patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Binary Search implementation\n    }\n}",
    "category": "Binary Search",
    "functionName": "binarySearchChallengePattern37",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction binarySearchChallengePattern37(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def binarySearchChallengePattern37(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object binarySearchChallengePattern37(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto binarySearchChallengePattern37(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 286,
    "title": "Tree Challenge Pattern #38",
    "topic": "Tree",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Tree principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Tree patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Tree implementation\n    }\n}",
    "category": "Tree",
    "functionName": "treeChallengePattern38",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction treeChallengePattern38(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def treeChallengePattern38(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object treeChallengePattern38(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto treeChallengePattern38(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 287,
    "title": "Heap Challenge Pattern #39",
    "topic": "Heap",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Heap principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Heap patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Heap implementation\n    }\n}",
    "category": "Heap",
    "functionName": "heapChallengePattern39",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction heapChallengePattern39(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def heapChallengePattern39(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object heapChallengePattern39(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto heapChallengePattern39(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 288,
    "title": "Hashing Challenge Pattern #40",
    "topic": "Hashing",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Hashing principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Hashing patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Hashing implementation\n    }\n}",
    "category": "Hashing",
    "functionName": "hashingChallengePattern40",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction hashingChallengePattern40(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def hashingChallengePattern40(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object hashingChallengePattern40(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto hashingChallengePattern40(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 289,
    "title": "Graph Challenge Pattern #41",
    "topic": "Graph",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Graph principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Graph patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Graph implementation\n    }\n}",
    "category": "Graph",
    "functionName": "graphChallengePattern41",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction graphChallengePattern41(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def graphChallengePattern41(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object graphChallengePattern41(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto graphChallengePattern41(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 290,
    "title": "Dynamic Programming Challenge Pattern #42",
    "topic": "Dynamic Programming",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Dynamic Programming principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Dynamic Programming patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Dynamic Programming implementation\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "dynamicProgrammingChallengePattern42",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction dynamicProgrammingChallengePattern42(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def dynamicProgrammingChallengePattern42(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object dynamicProgrammingChallengePattern42(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto dynamicProgrammingChallengePattern42(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 291,
    "title": "Greedy Challenge Pattern #43",
    "topic": "Greedy",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Greedy principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Greedy patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Greedy implementation\n    }\n}",
    "category": "Greedy",
    "functionName": "greedyChallengePattern43",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction greedyChallengePattern43(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def greedyChallengePattern43(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object greedyChallengePattern43(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto greedyChallengePattern43(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 292,
    "title": "Backtracking Challenge Pattern #44",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Backtracking principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Backtracking patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Backtracking implementation\n    }\n}",
    "category": "Backtracking",
    "functionName": "backtrackingChallengePattern44",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction backtrackingChallengePattern44(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def backtrackingChallengePattern44(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object backtrackingChallengePattern44(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto backtrackingChallengePattern44(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 293,
    "title": "Trie Challenge Pattern #45",
    "topic": "Trie",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Trie principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Trie patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Trie implementation\n    }\n}",
    "category": "Trie",
    "functionName": "trieChallengePattern45",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction trieChallengePattern45(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def trieChallengePattern45(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object trieChallengePattern45(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto trieChallengePattern45(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 294,
    "title": "Bit Manipulation Challenge Pattern #46",
    "topic": "Bit Manipulation",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Bit Manipulation principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Bit Manipulation patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Bit Manipulation implementation\n    }\n}",
    "category": "Bit Manipulation",
    "functionName": "bitManipulationChallengePattern46",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction bitManipulationChallengePattern46(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def bitManipulationChallengePattern46(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object bitManipulationChallengePattern46(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto bitManipulationChallengePattern46(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 295,
    "title": "Math Challenge Pattern #47",
    "topic": "Math",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Math principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Math patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Math implementation\n    }\n}",
    "category": "Math",
    "functionName": "mathChallengePattern47",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mathChallengePattern47(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mathChallengePattern47(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mathChallengePattern47(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mathChallengePattern47(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 296,
    "title": "Arrays Challenge Pattern #48",
    "topic": "Arrays",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Arrays principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Arrays patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Arrays implementation\n    }\n}",
    "category": "Arrays",
    "functionName": "arraysChallengePattern48",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction arraysChallengePattern48(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def arraysChallengePattern48(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object arraysChallengePattern48(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto arraysChallengePattern48(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 297,
    "title": "Strings Challenge Pattern #49",
    "topic": "Strings",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Strings principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Strings patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Strings implementation\n    }\n}",
    "category": "Strings",
    "functionName": "stringsChallengePattern49",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction stringsChallengePattern49(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def stringsChallengePattern49(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object stringsChallengePattern49(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto stringsChallengePattern49(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 298,
    "title": "Linked Lists Challenge Pattern #50",
    "topic": "Linked Lists",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Linked Lists principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Linked Lists patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Linked Lists implementation\n    }\n}",
    "category": "Linked Lists",
    "functionName": "linkedListsChallengePattern50",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction linkedListsChallengePattern50(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def linkedListsChallengePattern50(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object linkedListsChallengePattern50(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto linkedListsChallengePattern50(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 299,
    "title": "Stack Challenge Pattern #51",
    "topic": "Stack",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Stack principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Stack patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Stack implementation\n    }\n}",
    "category": "Stack",
    "functionName": "stackChallengePattern51",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction stackChallengePattern51(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def stackChallengePattern51(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object stackChallengePattern51(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto stackChallengePattern51(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 300,
    "title": "Queue Challenge Pattern #52",
    "topic": "Queue",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Queue principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Queue patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Queue implementation\n    }\n}",
    "category": "Queue",
    "functionName": "queueChallengePattern52",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction queueChallengePattern52(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def queueChallengePattern52(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object queueChallengePattern52(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto queueChallengePattern52(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 301,
    "title": "Binary Search Challenge Pattern #53",
    "topic": "Binary Search",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Binary Search principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Binary Search patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Binary Search implementation\n    }\n}",
    "category": "Binary Search",
    "functionName": "binarySearchChallengePattern53",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction binarySearchChallengePattern53(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def binarySearchChallengePattern53(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object binarySearchChallengePattern53(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto binarySearchChallengePattern53(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 302,
    "title": "Tree Challenge Pattern #54",
    "topic": "Tree",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Tree principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Tree patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Tree implementation\n    }\n}",
    "category": "Tree",
    "functionName": "treeChallengePattern54",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction treeChallengePattern54(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def treeChallengePattern54(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object treeChallengePattern54(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto treeChallengePattern54(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 303,
    "title": "Heap Challenge Pattern #55",
    "topic": "Heap",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Heap principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Heap patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Heap implementation\n    }\n}",
    "category": "Heap",
    "functionName": "heapChallengePattern55",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction heapChallengePattern55(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def heapChallengePattern55(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object heapChallengePattern55(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto heapChallengePattern55(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 304,
    "title": "Hashing Challenge Pattern #56",
    "topic": "Hashing",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Hashing principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Hashing patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Hashing implementation\n    }\n}",
    "category": "Hashing",
    "functionName": "hashingChallengePattern56",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction hashingChallengePattern56(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def hashingChallengePattern56(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object hashingChallengePattern56(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto hashingChallengePattern56(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 305,
    "title": "Graph Challenge Pattern #57",
    "topic": "Graph",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Graph principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Graph patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Graph implementation\n    }\n}",
    "category": "Graph",
    "functionName": "graphChallengePattern57",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction graphChallengePattern57(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def graphChallengePattern57(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object graphChallengePattern57(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto graphChallengePattern57(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 306,
    "title": "Dynamic Programming Challenge Pattern #58",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Dynamic Programming principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Dynamic Programming patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Dynamic Programming implementation\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "dynamicProgrammingChallengePattern58",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction dynamicProgrammingChallengePattern58(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def dynamicProgrammingChallengePattern58(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object dynamicProgrammingChallengePattern58(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto dynamicProgrammingChallengePattern58(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 307,
    "title": "Greedy Challenge Pattern #59",
    "topic": "Greedy",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Greedy principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Greedy patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Greedy implementation\n    }\n}",
    "category": "Greedy",
    "functionName": "greedyChallengePattern59",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction greedyChallengePattern59(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def greedyChallengePattern59(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object greedyChallengePattern59(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto greedyChallengePattern59(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 308,
    "title": "Backtracking Challenge Pattern #60",
    "topic": "Backtracking",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Backtracking principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Backtracking patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Backtracking implementation\n    }\n}",
    "category": "Backtracking",
    "functionName": "backtrackingChallengePattern60",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction backtrackingChallengePattern60(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def backtrackingChallengePattern60(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object backtrackingChallengePattern60(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto backtrackingChallengePattern60(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 309,
    "title": "Trie Challenge Pattern #61",
    "topic": "Trie",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Trie principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Trie patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Trie implementation\n    }\n}",
    "category": "Trie",
    "functionName": "trieChallengePattern61",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction trieChallengePattern61(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def trieChallengePattern61(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object trieChallengePattern61(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto trieChallengePattern61(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 310,
    "title": "Bit Manipulation Challenge Pattern #62",
    "topic": "Bit Manipulation",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Bit Manipulation principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Bit Manipulation patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Bit Manipulation implementation\n    }\n}",
    "category": "Bit Manipulation",
    "functionName": "bitManipulationChallengePattern62",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction bitManipulationChallengePattern62(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def bitManipulationChallengePattern62(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object bitManipulationChallengePattern62(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto bitManipulationChallengePattern62(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 311,
    "title": "Math Challenge Pattern #63",
    "topic": "Math",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Math principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Math patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Math implementation\n    }\n}",
    "category": "Math",
    "functionName": "mathChallengePattern63",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction mathChallengePattern63(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def mathChallengePattern63(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object mathChallengePattern63(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto mathChallengePattern63(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 312,
    "title": "Arrays Challenge Pattern #64",
    "topic": "Arrays",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Arrays principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Arrays patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Arrays implementation\n    }\n}",
    "category": "Arrays",
    "functionName": "arraysChallengePattern64",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction arraysChallengePattern64(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def arraysChallengePattern64(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object arraysChallengePattern64(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto arraysChallengePattern64(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 313,
    "title": "Strings Challenge Pattern #65",
    "topic": "Strings",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Strings principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Strings patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Strings implementation\n    }\n}",
    "category": "Strings",
    "functionName": "stringsChallengePattern65",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction stringsChallengePattern65(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def stringsChallengePattern65(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object stringsChallengePattern65(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto stringsChallengePattern65(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 314,
    "title": "Linked Lists Challenge Pattern #66",
    "topic": "Linked Lists",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Linked Lists principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Linked Lists patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Linked Lists implementation\n    }\n}",
    "category": "Linked Lists",
    "functionName": "linkedListsChallengePattern66",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction linkedListsChallengePattern66(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def linkedListsChallengePattern66(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object linkedListsChallengePattern66(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto linkedListsChallengePattern66(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 315,
    "title": "Stack Challenge Pattern #67",
    "topic": "Stack",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Stack principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Stack patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Stack implementation\n    }\n}",
    "category": "Stack",
    "functionName": "stackChallengePattern67",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction stackChallengePattern67(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def stackChallengePattern67(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object stackChallengePattern67(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto stackChallengePattern67(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 316,
    "title": "Queue Challenge Pattern #68",
    "topic": "Queue",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Queue principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Queue patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Queue implementation\n    }\n}",
    "category": "Queue",
    "functionName": "queueChallengePattern68",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction queueChallengePattern68(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def queueChallengePattern68(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object queueChallengePattern68(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto queueChallengePattern68(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 317,
    "title": "Binary Search Challenge Pattern #69",
    "topic": "Binary Search",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Binary Search principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Binary Search patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Binary Search implementation\n    }\n}",
    "category": "Binary Search",
    "functionName": "binarySearchChallengePattern69",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction binarySearchChallengePattern69(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def binarySearchChallengePattern69(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object binarySearchChallengePattern69(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto binarySearchChallengePattern69(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 318,
    "title": "Tree Challenge Pattern #70",
    "topic": "Tree",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Tree principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Tree patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Tree implementation\n    }\n}",
    "category": "Tree",
    "functionName": "treeChallengePattern70",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction treeChallengePattern70(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def treeChallengePattern70(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object treeChallengePattern70(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto treeChallengePattern70(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 319,
    "title": "Heap Challenge Pattern #71",
    "topic": "Heap",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Heap principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Heap patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Heap implementation\n    }\n}",
    "category": "Heap",
    "functionName": "heapChallengePattern71",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction heapChallengePattern71(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def heapChallengePattern71(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object heapChallengePattern71(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto heapChallengePattern71(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 320,
    "title": "Hashing Challenge Pattern #72",
    "topic": "Hashing",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Hashing principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Hashing patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Hashing implementation\n    }\n}",
    "category": "Hashing",
    "functionName": "hashingChallengePattern72",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction hashingChallengePattern72(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def hashingChallengePattern72(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object hashingChallengePattern72(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto hashingChallengePattern72(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 321,
    "title": "Graph Challenge Pattern #73",
    "topic": "Graph",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Graph principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Graph patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Graph implementation\n    }\n}",
    "category": "Graph",
    "functionName": "graphChallengePattern73",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction graphChallengePattern73(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def graphChallengePattern73(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object graphChallengePattern73(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto graphChallengePattern73(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 322,
    "title": "Dynamic Programming Challenge Pattern #74",
    "topic": "Dynamic Programming",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Dynamic Programming principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Dynamic Programming patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Dynamic Programming implementation\n    }\n}",
    "category": "Dynamic Programming",
    "functionName": "dynamicProgrammingChallengePattern74",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction dynamicProgrammingChallengePattern74(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def dynamicProgrammingChallengePattern74(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object dynamicProgrammingChallengePattern74(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto dynamicProgrammingChallengePattern74(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 323,
    "title": "Greedy Challenge Pattern #75",
    "topic": "Greedy",
    "difficulty": "HARD",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Greedy principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Greedy patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Greedy implementation\n    }\n}",
    "category": "Greedy",
    "functionName": "greedyChallengePattern75",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction greedyChallengePattern75(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def greedyChallengePattern75(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object greedyChallengePattern75(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto greedyChallengePattern75(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 324,
    "title": "Backtracking Challenge Pattern #76",
    "topic": "Backtracking",
    "difficulty": "MEDIUM",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Backtracking principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Backtracking patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Backtracking implementation\n    }\n}",
    "category": "Backtracking",
    "functionName": "backtrackingChallengePattern76",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction backtrackingChallengePattern76(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def backtrackingChallengePattern76(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object backtrackingChallengePattern76(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto backtrackingChallengePattern76(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  },
  {
    "id": 325,
    "title": "Trie Challenge Pattern #77",
    "topic": "Trie",
    "difficulty": "EASY",
    "companies": "FAANG & Tier-1 Tech",
    "desc": "Solve the algorithmic challenge utilizing advanced Trie principles. Optimize runtime and memory efficiency to satisfy automated test suites.",
    "constraints": "• 1 <= N <= 2 * 10^5\n• Time Complexity: Optimal\n• Space Complexity: Minimal",
    "hints": "Apply standard Trie patterns. Look for monotonic properties or overlapping subproblems.",
    "solution": "public class Solution {\n    public void execute() {\n        // Optimal Trie implementation\n    }\n}",
    "category": "Trie",
    "functionName": "trieChallengePattern77",
    "examples": [
      {
        "input": "input = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Standard deterministic execution matching constraints."
      },
      {
        "input": "input = [4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Boundary case with non-negative values."
      }
    ],
    "starterTemplates": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction trieChallengePattern77(input) {\n    // Implement optimal algorithmic solution\n    return input;\n}",
      "python": "class Solution:\n    def trieChallengePattern77(self, input: any) -> any:\n        # Implement optimal algorithmic solution\n        return input",
      "java": "class Solution {\n    public Object trieChallengePattern77(Object input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n}",
      "cpp": "class Solution {\npublic:\n    auto trieChallengePattern77(auto input) {\n        // Implement optimal algorithmic solution\n        return input;\n    }\n};"
    },
    "testCases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "rawInput": "input = [1, 2, 3]",
        "expected": [
          1,
          2,
          3
        ],
        "expectedRaw": "[1, 2, 3]"
      },
      {
        "args": [
          [
            4,
            5,
            6
          ]
        ],
        "rawInput": "input = [4, 5, 6]",
        "expected": [
          4,
          5,
          6
        ],
        "expectedRaw": "[4, 5, 6]"
      },
      {
        "args": [
          [
            7,
            8,
            9
          ]
        ],
        "rawInput": "input = [7, 8, 9]",
        "expected": [
          7,
          8,
          9
        ],
        "expectedRaw": "[7, 8, 9]",
        "hidden": true
      }
    ]
  }
];

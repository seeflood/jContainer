# jContainer

## Intro

javascript容器库，包含常用容器及相关算法（如数组的排序/找第n个，如图相关的算法）

This is a container library for javascript,which include frequently used containers and those related algorithms.

## Usage

原则上每个js尽量独立，项目需要用哪个就把哪个js粘贴进去。

特例是复杂的数据结构可能依赖简单结构的js、工具类依赖容器js。具体包括：

- Graph.js依赖Bag.js
- GraphUtils.js依赖Graph.js


Technically,you can copy only the js file you need into you project.

Exceptions are:

- Graph.js requires Bag.js
- GraphUtils.js requires Graph.js
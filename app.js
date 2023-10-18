"use strict";
/** Simple demo Express app. */

const express = require("express");
const { findMean, findMedian, findMode, } = require("./stats");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const { convertStrNums, writeFile } = require("./utils");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  if (!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  const strNums = req.query.nums.split(',');
  const nums = convertStrNums(strNums);

  const response = {
    response: {
      operation: "mean",
      value: findMean(nums)
    }
  };

  if (req.query.save === "true") {
    writeFile("results.json", JSON.stringify(response));
  }

  return res.json(response);
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  if (!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  const strNums = req.query.nums.split(',');
  const nums = convertStrNums(strNums);

  const response = {
    response: {
      operation: "median",
      value: findMedian(nums)
    }
  };

  if (req.query.save === "true") {
    writeFile("results.json", JSON.stringify(response));
  }

  return res.json(response);
});

/** Finds mode of nums in qs: returns {operation: "mode", result } */
app.get("/mode", function (req, res) {
  if (!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  const strNums = req.query.nums.split(',');
  const nums = convertStrNums(strNums);

  const response = {
    response: {
      operation: "mode",
      value: findMode(nums)
    }
  };

  if (req.query.save === "true") {
    writeFile("results.json", JSON.stringify(response));
  }

  return res.json(response);
});

/**
 * Runs all statistics on nums in qs: returns
 * { operation: "all", mean, median, mode }
 * */
app.get("/all", function (req, res) {
  if (!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  const strNums = req.query.nums.split(',');
  const nums = convertStrNums(strNums);

  const response = {
    response: {
      operation: "all",
      mean: findMean(nums),
      median: findMedian(nums),
      mode: findMode(nums)
    }
  };

  if (req.query.save === "true") {
    writeFile("results.json", JSON.stringify(response));
  }

  return res.json(response);
});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;
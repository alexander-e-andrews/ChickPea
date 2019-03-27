/* eslint-disable multiline-comment-style */
let mongoose
let slideShowSchema
let slideSchema
let dataURLSchema
try {
  mongoose = require("mongoose")
  slideShowSchema = require("../models/SlideShow")
  slideSchema = require("../models/Slide")
  dataURLSchema = require("../models/DataURLModel")
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e)
}

/**
 * returns a new slideshow object for editing and saving
 */
function createSlideShow() {
  return new slideShowSchema()
}

/**
 * Will return an array like {[_id, title], [_id, title]}
 * Returns:
 * _id: _id of the slide shows
 * title: The title of the slideshow
 */
async function returnSlideShows() {
  // eslint-disable-next-line no-console
  //console.log(slideShowSchema)
  var slideShow = slideShowSchema
  try {
    return await slideShow
      .find({})
      .select("_id title")
      .exec()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

/**
 *
 * @param {*} id - Give the ID of the slide show you want
 * Returns:
 * A full slideshow
 * Use .slides to get individual slides
 */
async function getSlideShow(id) {
  var slideShow = slideShowSchema
  try {
    return await slideShow
      .findById(id)
      .populate("slides")
      .exec()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
}

/**
 * Deletes the slideshow
 * And all underlying slides
 * @param {*} id
 */
async function deleteSlideShow(id) {
  var slideShow = slideShowSchema
  var slide = slideSchema
  await slideShow
    .findById(id)
    .select("slides")
    .exec(function(err, slides) {
      // eslint-disable-next-line no-console
      if (err) return console.error(err)
      // eslint-disable-next-line no-console
      console.log(slides)
      return slideshow
    })
}

/**
 * returns a new slide object for editing and saving
 */
function createSlide() {
  return new slideSchema()
}

/**
 * Will return an array like {[_id, title], [_id, title]}
 * Returns:
 * _id: _id of the slide
 * title: The title of the slide
 */
async function returnSlides() {
  var slide = slideSchema
  await slide
    .find({})
    .select("_id title")
    .exec()
}

/**
 *
 * @param {*} id - Give the ID of the slide you want
 * Returns:
 * A full slide
 */
async function getSlide(id) {
  var slide = slideSchema
  await slide.findById(id).exec()
}

async function saveSlide(slide) {
  var newEntry = new slideSchema()

  // eslint-disable-next-line no-console
  console.log(newEntry)
  // eslint-disable-next-line no-console
  console.log("///////////////////////////////////////////////")
  // eslint-disable-next-line no-console
  console.log(newEntry.constructor)
  if (slide instanceof slideSchema) {
    // eslint-disable-next-line no-console
    console.log("RYAN GOSLING SUCKS ASS")
  } else {
    // eslint-disable-next-line no-console
    console.error("Object is not a slide")
  }
}

async function deleteSlide(id) {
  var slide = slideSchema
  await slide.remove({ _id: id }).exec()
}

/**
 * Deletes every item in slide and slideshows
 * USE ONLY FOR TESTING
 */
async function clearALLSlidesandShows() {
  var slide = slideSchema
  var slideShow = slideShowSchema
  await slide.deleteMany({}).exec(function(err) {
    // eslint-disable-next-line no-console
    if (err) return console.error(err)
    // eslint-disable-next-line no-console
    console.log("Deleted slides")
  })
  slideShow.deleteMany({}).exec(function(err) {
    // eslint-disable-next-line no-console
    if (err) return console.error(err)
    // eslint-disable-next-line no-console
    console.log("deleted slideshows")
  })
}

module.exports = {
  createSlideShow: function() {
    return createSlideShow()
  },
  returnSlideShows: async function() {
    return await returnSlideShows()
  },
  getSlideShow: async function(id) {
    return await getSlideShow(id)
  },
  deleteSlideShow: async function(id) {
    return await deleteSlideShow(id)
  },
  createSlide: function() {
    return createSlide()
  },
  //For functions without args, and just do function:function
  returnSlides: async function() {
    return await returnSlides()
  },
  //For functions, that need args. this is the only nice way I found
  getSlide: async function(id) {
    return await getSlide(id)
  },
  saveSlide: async function(slide) {
    saveSlide(slide)
  },
  deleteSlide: async function(id) {
    return await deleteSlide(id)
  },
  clearALLSlidesandShows: async function() {
    return await clearALLSlidesandShows()
  },
  slide: slideSchema,
  slideShow: slideShowSchema
}

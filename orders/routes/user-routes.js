//modules: require
const express = require("express");
const {index, show, store, update} = require("../controllers/user-controller");

//Router: instance
const router = express.Router();

/**
 * @method GET
 * @controllerMethod index
 */
router.get("", index);

/**
 * @method GET
 * @param :id
 * @controllerMethod show
 */
router.get("/:id", show);

/**
 * @method POST
 * @controllerMethod store
 */
router.post("", store);

/**
 * @method PUT
 * @param :id
 * @controllerMethod update
 */                     
router.put("/:id", update);


//module: export
module.exports = router;
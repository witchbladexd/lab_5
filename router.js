const Router = require('express');
const router = new Router();
const controller = require('./controller');

router.post('/client', controller.createClient);
router.get('/client', controller.getClients);
router.put('/client', controller.updateClient);
router.delete('/client/:id', controller.deleteClient);

router.post('/zayavka', controller.createZayavka);
router.get('/zayavka', controller.getZayavka);
router.put('/zayavka', controller.updateZayavka);
router.delete('/zayavka/:id', controller.deleteZayavka);

router.post('/usluga', controller.createUsluga);
router.get('/usluga', controller.getUsluga);
router.put('/usluga', controller.updateUsluga);
router.delete('/usluga/:id', controller.deleteUsluga);

module.exports = router;
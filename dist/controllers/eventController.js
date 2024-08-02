"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventById = exports.getEvents = exports.createEvent = void 0;
const Event_1 = require("../models/Event");
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, date, totalTickets } = req.body;
        const event = new Event_1.Event({ name, date, totalTickets });
        yield event.save();
        res.status(201).send(event);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.createEvent = createEvent;
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield Event_1.Event.find();
        res.status(200).send(events);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getEvents = getEvents;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.Event.findById(req.params.id);
        if (!event) {
            return res.status(404).send({ message: 'Event not found' });
        }
        res.status(200).send(event);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getEventById = getEventById;

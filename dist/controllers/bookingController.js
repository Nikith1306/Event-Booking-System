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
exports.cancelBooking = exports.createBooking = void 0;
const Event_1 = require("../models/Event");
const Booking_1 = require("../models/Booking");
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, eventId, quantity } = req.body;
        if (quantity > 15) {
            return res.status(400).send({ message: 'Cannot book more than 15 tickets' });
        }
        const event = yield Event_1.Event.findById(eventId);
        if (!event) {
            return res.status(404).send({ message: 'Event not found' });
        }
        if (event.totalTickets - event.bookedTickets < quantity) {
            return res.status(400).send({ message: 'Not enough tickets available' });
        }
        const booking = new Booking_1.Booking({ userId, eventId, quantity });
        yield booking.save();
        event.bookedTickets += quantity;
        yield event.save();
        res.status(201).send(booking);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.createBooking = createBooking;
const cancelBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield Booking_1.Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).send({ message: 'Booking not found' });
        }
        const event = yield Event_1.Event.findById(booking.eventId);
        if (event) {
            event.bookedTickets -= booking.quantity;
            yield event.save();
        }
        yield booking.deleteOne();
        res.status(200).send({ message: 'Booking cancelled' });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.cancelBooking = cancelBooking;

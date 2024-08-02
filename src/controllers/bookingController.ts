import { Request, Response } from 'express';
import { Event } from '../models/Event';
import { Booking } from '../models/Booking';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, eventId, quantity } = req.body;
    if (quantity > 15) {
      return res.status(400).send({ message: 'Cannot book more than 15 tickets' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }

    if (event.totalTickets - event.bookedTickets < quantity) {
      return res.status(400).send({ message: 'Not enough tickets available' });
    }

    const booking = new Booking({ userId, eventId, quantity });
    await booking.save();

    event.bookedTickets += quantity;
    await event.save();

    res.status(201).send(booking);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }

    const event = await Event.findById(booking.eventId);
    if (event) {
      event.bookedTickets -= booking.quantity;
      await event.save();
    }

    await booking.deleteOne();
    res.status(200).send({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).send(error);
  }
};

const { Schema, model } = require('mongoose');
const { randomUUID } = require('node:crypto');

const ticketSchema = new Schema(
  {
    id: {
      type: String,
      default: randomUUID,
    },
    guildId: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      default: null,
    },
    claimerId: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['OPEN', 'CLOSED', 'DELETED'],
      default: 'OPEN',
    },
  },
  { timestamps: true }
);

module.exports = model('Ticket', ticketSchema);

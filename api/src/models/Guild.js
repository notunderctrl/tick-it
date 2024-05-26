const { Schema, model } = require('mongoose');

const guildSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    iconHash: {
      type: String,
      default: null,
    },
    openTicketsCategoryId: {
      type: String,
      default: null,
    },
    closedTicketsCategoryId: {
      type: String,
      default: null,
    },
    transcriptsChannelId: {
      type: String,
      default: null,
    },
    modRoleIds: {
      type: [String],
      default: [],
    },
    pingRoleIds: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = model('Guild', guildSchema);

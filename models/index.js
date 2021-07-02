const User = require('./user.js');
const Entry = require('./entry.js');
const Comment = require('./comment.js');

User.hasMany(Entry, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Entry.belongsTo(User, {
    foreignKey: 'user_id'
});

Entry.hasMany(Comment, {
    foreignKey: 'entry_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(Entry, {
    foreignKey: 'entry_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Entry, Comment };
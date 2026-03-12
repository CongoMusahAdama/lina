const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        default: 'Luxury'
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
        default: 0
    },
    discountPrice: {
        type: Number,
        default: null
    },
    stock: {
        type: Number,
        required: [true, 'Please provide stock count'],
        default: 0
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        default: '/midnight.png'
    },
    images: [String],
    sizes: {
        type: [String],
        default: ['250ml', '500ml']
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Sold Out'],
        default: 'Active'
    },
    soldOutAt: {
        type: Date,
        default: null
    },
    comesWithPouch: {
        type: Boolean,
        default: false
    },
    sku: {
        type: String,
        unique: true
    }
}, { timestamps: true });

// Auto-generate a unique SKU if one is not provided
ProductSchema.pre('save', async function (next) {
    if (!this.sku) {
        let unique = false;
        while (!unique) {
            const candidate = 'LINA-' + Math.random().toString(36).toUpperCase().slice(2, 8);
            const existing = await mongoose.model('Product').findOne({ sku: candidate });
            if (!existing) {
                this.sku = candidate;
                unique = true;
            }
        }
    }
    next();
});

module.exports = mongoose.model('Product', ProductSchema);

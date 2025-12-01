import mongoose from "mongoose";


// Define the Subscription schema
const subscriptionSchema = new mongoose.Schema({
    name: { 
    type: String,
    required: [true, 'subcription name name is required'],
    trim: true,
    minlength: 2,
    maxlength: 100
    },
    price: { 
    type: Number, 
    required: [true, 'Subscription price is required'], 
    min: [0, 'Price must be greater than zero']
    },
    currency: { 
    type: String,
    enum: ['USD', 'EUR', 'GBP', 'CAD'],
    default: 'USD',
    },
    frequency: { 
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: { 
    type: String,
    enum: ['sports','news', 'entertainment', 'lifestyle', 'productivity','technology', 'education', 'politics', 'other'],
    required: [true, 'Subscription category is required'],
    },
    paymentMethod: { 
    type: String,
    required: true,
    trim: true,
    },
    status: { 
    type: String,
    enum: ['active', 'canceled', 'expired'],
    default: 'active',
    },
    startDate: { 
    type: Date,
    required: true,
    validate: {
        validator: (value) => value <= new Date(),
        message: 'Start date cannot be in the future.'
        }
    },
    renewalDate: { 
    type: Date,
    validate: {
        validator: function(value) {
            return value > this.startDate;
        },
        message: 'Renewal date must be after start date.'
        }
    },
    user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
    },
    
}, { timestamps: true });


// method to auto-calculate renewalDate based on frequency and startDate
subscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    // auto update the status if renewalDate has passed
    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});

const Subscription = mongoose.model('User', subscriptionSchema);

export default Subscription;

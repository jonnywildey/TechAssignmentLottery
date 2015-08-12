/**
 * lottery set
 */
function LotterySet() {

	this.selectedNumbers = [];
}
/**
 * lowest lottery value
 */
LotterySet.prototype.minRange = 1;
/**
 * highest lottery value
 */
LotterySet.prototype.maxRange = 20;
/**
 * 
 */
LotterySet.prototype.setCount = 5;
/**
 * selected numbers
 */
LotterySet.prototype.selectedNumbers = null;


/**
 * Add number
 */
LotterySet.prototype.addNumber = function(value) {
	var valid = true;
	if (this.selectedNumbers.length === this.setCount) {
		//full set
		valid = false;
	}
	if (value < this.minRange || value > this.maxRange) {
		valid = false;
	}	
	//check value doesn't already exist
	this.selectedNumbers.forEach(function(val) {
		if (val === value) {
			valid = false;
		}
	});
	if (valid) {
		this.selectedNumbers.push(value);
	}
	return valid
};

/**
 * Add range 
 */
LotterySet.prototype.addRange = function(arr) {
	var me = this;
	var valid = true;
	arr.forEach(function(val) {
		valid = valid && me.addNumber(val);
	});
	return valid;
};

/**
 * Have all numbers been picked
 */
LotterySet.prototype.pickedAllNumbers = function() {
	return this.selectedNumbers.length === this.setCount;
};

/**
 * Generate and add random number
 */
LotterySet.prototype.generateNumber = function() {
	var random = Math.floor(Math.random() * ((this.maxRange + 1) - this.minRange)) + this.minRange;
	this.addNumber(random);
};

/**
 * return a string representation of numbers
 */
LotterySet.prototype.numbersToString = function() {
	var str = '';
	this.selectedNumbers.forEach(function(num) {
		str += num + ', ';
	});
	return str;
};

/**
 * Generate set of numbers
 */
LotterySet.prototype.generateSet = function() {
	while (this.selectedNumbers.length < this.setCount) {
		this.generateNumber();
	}
};

/**
 * Does selected numbers contain value
 */
LotterySet.prototype.contains = function(val) {
	var contains = false;
	this.selectedNumbers.forEach(function(num) {
		if (val === num) {
			contains = true;
		}
	});
	return contains;
};

/**
 * checks whether other lottery set 
 */
LotterySet.prototype.equalSet = function(lotterySet) {
	//must have all numbers
	if (!this.pickedAllNumbers() || !lotterySet.pickedAllNumbers()) {
		return false;
	}
	var equal = true;
	//check our numbers to theirs
	this.selectedNumbers.forEach(function(val) {
		if (!lotterySet.contains(val)) {
			equal = false;
		}
	});
	return equal;
};



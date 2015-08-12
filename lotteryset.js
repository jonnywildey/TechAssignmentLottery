/**
 * 
 */

function lotteryset(seed) {
	var me = this;
	if (seed == null) {
		seed = 5;
	}
	//seed for random number generation
	me.seed = seed;
	//
	me.selectedNumbers = [];
}
/**
 * lowest lottery value
 */
lotteryset.prototype.minRange = 1;
/**
 * highest lottery value
 */
lotteryset.prototype.maxRange = 20;
/**
 * 
 */
lotteryset.prototype.ballCount = 5;
/**
 * selected numbers
 */
lotteryset.prototype.selectedNumbers = [];

/**
 * Add number
 */
lotteryset.prototype.addNumber = function(value) {
	var valid = true;
	if (this.selectedNumbers.length === this.ballCount) {
		//already have full set
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
}

/**
 * Generate random number
 */
lotteryset.prototype.generateRandom = function() {
	
}



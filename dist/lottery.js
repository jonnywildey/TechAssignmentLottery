function LotteryManager() {
	this.participants = [];
	this.lotterySet = new LotterySet();
}

/**
 * List of all participants in lottery
 */
LotteryManager.prototype.participants = null;

/**
 * Manager's lottery set
 */
LotteryManager.prototype.lotterySet = null;

LotteryManager.prototype.performLottery = function() {
	var me = this;
	//check for participants
	if (this.participants.length === 0) {
		throw 'no participants, no lottery';
	}
	this.participants.forEach(function(participant) {
		if (!participant.isReadyForLottery()) {
			throw 'participant ' + participant.name + ' not ready'; 
		}
	});
	//setup our numbers
	this.output('picking numbers...');
	var ls = me.lotterySet;
	ls.generateSet();
	this.output('winning numbers: ' + ls.numbersToString());
	//check for winners
	var noWinners = true;
	this.participants.forEach(function(participant) {
		if (ls.equalSet(participant.getLotterySet())) {
			participant.wins();
			me.output(participant.name + ' wins!');
			noWinners = false;
		}
	});
	//no winners
	if (noWinners) {
		me.output('no winners this time');
	}
};

/**
 * output message in some form
 */
LotteryManager.prototype.output = function(msg) {
	console.log(msg);
	//document.write(msg);
};

/**
 * Add participant
 */
LotteryManager.prototype.addParticipant = function(participant) {
	this.participants.push(participant);
};
function LotterySet() {

	this.selectedNumbers = [];
	this.bitSum = 0;
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
 * number representing unique set of numbers
 */
LotterySet.prototype.bitSum = null;


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
		//add value to id
		this.bitSum += (Math.pow(2, value));
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
	
	return (Math.pow(2, val) & this.bitSum) !== 0;
};

/**
 * checks whether other lottery set 
 */
LotterySet.prototype.equalSet = function(lotterySet) {
	//must have all numbers
	if (!this.pickedAllNumbers() || !lotterySet.pickedAllNumbers()) {
		return false;
	}
	//equal sets have equal sums
	return (lotterySet.bitSum === this.bitSum);
};



function Participant(name, sms) {	 
	 this.lotterySet = new LotterySet();
   this.name = name;
	 this.sms = sms;
   this.won = false;
 }
 
 /**
  * Participants name
  */
 Participant.prototype.name = null;
 
  /**
  * Participants phone
  */
 Participant.prototype.phone = null;
 
 /**
  * Participants email
  */
 Participant.prototype.email = null;
 
 /**
  * is winner
  */
 Participant.prototype.won = null;
 
 
 /**
  * Participant wins
  */
 Participant.prototype.wins = function() {
   if (this.sms) {
     this.sendSms();
   } else {
     this.sendEmail();
   }
   this.won = true;
 };
 
 /**
  * Send sms
  */
 Participant.prototype.sendSms = function() {
   //...
 }
 
  /**
  * Send email
  */
 Participant.prototype.sendEmail = function() {
   //...
 };
 
 /**
  * Whether preference is for email
  */
 Participant.prototype.sms = null;
 
 Participant.prototype.getLotterySet = function() {
   return this.lotterySet;
 };
 
 Participant.prototype.isReadyForLottery = function() {
   var ready = true;
   var ls = this.getLotterySet();
   //all numbers been picked?
   ready = ready && ls.pickedAllNumbers();
   //has a name?
   ready = ready && (this.name != null);
   return ready;
 };
 
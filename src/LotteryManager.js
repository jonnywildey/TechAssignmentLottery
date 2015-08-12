/**
 * manager of lottery
 */
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
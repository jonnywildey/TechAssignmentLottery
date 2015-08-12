/**
 * lottery participant
 */
 
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
 
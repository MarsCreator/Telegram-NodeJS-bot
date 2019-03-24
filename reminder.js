const TelegramBot = require('node-telegram-bot-api');
const CronJob = require('cron').CronJob;

const token = '';

const bot = new TelegramBot(token, { polling: true });
 
// проверяем чат и если введена команда "/start", выводим сообщение
bot.onText(/\/start/, (msg, match) => {
    // Составляем сообщение, которое будет содержать имя и фамилию того,
    // кто взаимодействует с ботом
	var message = 'Привет ' + msg.chat.last_name + ' ' + msg.chat.first_name;

	console.log('Before job instantiation');
	const job = new CronJob('*/59 * * * * *', function() {  //"задача" выполняется каждые 59 секунд
		
	var chd;
	var day = (new Date()).getDay();

	switch (day)				//проверяем, какой сегодня день недели (0-вс, 1-пн и т.д.)
	{
      case 0: chd=0; break;
  	  case 1: chd=1; break;
	  case 2: chd=2; break;
  	  case 3: chd=3; break;
      case 4: chd=4; break;
      case 5: chd=5; break;
      case 6: chd=6; break;
	}

	var hours = (new Date()).getHours(); // текущий час
	//console.log(hours);
	var mins = (new Date()).getMinutes(); // текущая минута
	//console.log(mins);

	if ((hours == 8)&(mins == 1)){	// проверка текущего времени, для выполнения ботом напоминания 
		var mess = (hours + ' ' + mins); // здесь находится напоминание, в данном примере выводится текущее время
		// отсылаем сообщение, первым параметром передавая id чата,
   	    // а вторым уже само сообщение
		bot.sendMessage(msg.chat.id, mess);

		//Тут при необходимости будет проверка дня недели, чтобы вывести расписание занятий/дня именно на этот день недели

	}
		
	});
	console.log('After job instantiation');
	job.start();
});
import { Kafka } from 'kafkajs'
import { randomUUID } from 'node:crypto'

async function bootstrap() {
	const kafka = new Kafka({
		clientId: 'kafka-producer',
		brokers: ['bursting-cattle-8259-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username:
        'YnVyc3RpbmctY2F0dGxlLTgyNTkkxyxnoLnhyMnz9I7tTAGrPwM8gelFl6drjA4',
      password: 'c15a52dd19a1438e8b5f5909db1237c6',
    },
		ssl: true,
	})
		
	const producer = kafka.producer()
	
	await producer.connect()
	
	await producer.send({
		topic: 'notifications.send-notification',
		messages: [
			{
				value: JSON.stringify({
					content: 'Nova solicitação de amizade!',
					category: 'social',
					recipientId: randomUUID(),
				})
			},
		],
	})
	
	await producer.disconnect()
}

bootstrap()
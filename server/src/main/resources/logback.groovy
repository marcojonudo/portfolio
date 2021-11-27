import ch.qos.logback.classic.encoder.PatternLayoutEncoder
import ch.qos.logback.classic.filter.LevelFilter
import ch.qos.logback.core.spi.FilterReply

import java.nio.charset.Charset

if (System.getProperty('micronaut.environments')?.matches("prod|sta")) {
    appender("ROLLING_FILE", RollingFileAppender) {
        file = "logs/${System.getProperty('micronaut.environments')}/today.log"
        rollingPolicy(TimeBasedRollingPolicy) {
            fileNamePattern = "logs/${System.getProperty('micronaut.environments')}/log.%d{yyyy-MM-dd}.%i.log"
            timeBasedFileNamingAndTriggeringPolicy(SizeAndTimeBasedFNATP) {
                maxFileSize = "50MB"
            }
            maxHistory = 15
        }
        encoder(PatternLayoutEncoder) {
            charset = Charset.forName("UTF-8")
            pattern = '{"date": "%d{yyyy-MM-dd HH:mm:ss.SSS}", "thread": "%thread", "level": "%level", "logger": "%logger{36}", "message": %msg}%n'
        }
        filter(LevelFilter) {
            level = WARN
            onMatch = FilterReply.DENY
        }
    }
    root(INFO, ['ROLLING_FILE'])
} else {
    appender("STDOUT", ConsoleAppender) {
        encoder(PatternLayoutEncoder) {
            pattern = '%yellow(%d{HH:mm:ss.SSS}) [%thread] %highlight(%-5level) %-36logger{36} - %msg%n'
        }
        filter(LevelFilter) {
            level = WARN
            onMatch = FilterReply.DENY
        }
    }
    root(INFO, ['STDOUT'])
}

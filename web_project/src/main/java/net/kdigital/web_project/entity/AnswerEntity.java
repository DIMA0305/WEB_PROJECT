package net.kdigital.web_project.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import net.kdigital.web_project.dto.AnswerDTO;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Builder
@Entity
@Table(name="REPLY_CCA")
public class AnswerEntity {
	@SequenceGenerator(
		name="cca_seq"
		, sequenceName="cca_seq"
		, initialValue = 1
		, allocationSize = 1
	)
	
	@Id
	@GeneratedValue(generator="cca_seq")
	@Column(name="reply_num")
	private Long replyNum;
	
	@Column(name="reply_writer")
	private String replyWriter;
	
	@Column(name="reply_content")
	private String replyContent;
	
	@Column(name="reply_date")
	@CreationTimestamp
	private LocalDateTime replyDate;
	
	/* Board : Reply = 1 : 다
	 * 댓글이 일대다에서 다의 위치, 조인컬럼은 BoardEntity 객체의 boardNum
	 * 부모가 객체로 선어되어 있어야하고, 관계를 맺을때 @ManyToOne로 설정
	 */
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="consult_num")
	private BoardEntity boardEntity;
	
	public static AnswerEntity toEntity(AnswerDTO answerDTO, BoardEntity boardEntity) {
		return AnswerEntity.builder()
				.replyNum(answerDTO.getReplyNum())
				.replyWriter(answerDTO.getReplyWriter())
				.replyContent(answerDTO.getReplyContent())
				.replyDate(answerDTO.getReplyDate())
				.boardEntity(boardEntity)
				.build();
	}
}





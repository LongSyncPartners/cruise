using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CruiseHousing.Api.Entities
{
    [Table("m_property_type")]
    public class PropertyType
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Required]
        [StringLength(20)]
        [Column("code")]
        public string Code { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Column("display_order")]
        public int? DisplayOrder { get; set; }

        [Required]
        [Column("is_active")]
        public bool IsActive { get; set; }

        [Required]
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [StringLength(50)]
        [Column("created_by")]
        public string? CreatedBy { get; set; }

        [Required]
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        [StringLength(50)]
        [Column("updated_by")]
        public string? UpdatedBy { get; set; }

        [Column("deleted_at")]
        public DateTime? DeletedAt { get; set; }

        [StringLength(50)]
        [Column("deleted_by")]
        public string? DeletedBy { get; set; }
    }
}